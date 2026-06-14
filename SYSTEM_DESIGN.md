# System Design Questions

## Q1: Real-Time Leaderboard
*Design a leaderboard that updates in real time as judges submit scores. Visible to up to 5,000 concurrent viewers.*

**Data Transport Layer:** Server-Sent Events (SSE) is the best choice here. While WebSockets provide bi-directional communication, a leaderboard is inherently unidirectional (server -> client). SSE is lighter, operates over standard HTTP/1.1 or HTTP/2, and natively supports auto-reconnection. Polling would hammer the server with 5,000 reqs/sec if updated every second, so SSE is much more efficient.

**Out of Order Updates:** Each payload from the SSE stream must include an incrementing `version` or `timestamp`. If the frontend receives an update with a version lower than its current version, it simply discards it. 

**State Update Strategy:** Instead of re-rendering the entire 500-team list on every point change, we use a virtualized list (e.g., `react-window`). We debounce the incoming SSE events, batching score updates every 1-2 seconds before committing them to the React state. We animate only the rows that change positions using CSS transforms (`translateY`) rather than re-rendering the DOM nodes.

**Graceful Degradation:** If the SSE connection drops, the `EventSource` API handles reconnection automatically. If it fails entirely, we fallback to a slow-polling mechanism (every 30 seconds) and display a small UI indicator (e.g., "Offline - Reconnecting...") so users know the data might be stale.

---

## Q2: 50,000 Registrations in One Day
*Handle a massive influx of traffic attempting to register within 24 hours.*

**Preventing API Hammering:** The "Register" button should have an immediate client-side debounce and a visually disabled state (with a loading spinner) the moment it is clicked, preventing double-clicks.

**Queue Mechanism:** For extreme bursts, we implement a virtual waiting room (like Cloudflare Waiting Room or Amazon SQS on the backend). The frontend POSTs to the registration endpoint and might receive a `202 Accepted` instead of a `200 OK`, returning a queue ticket. The frontend then polls a lightweight status endpoint every 5 seconds until the ticket resolves.

**CDN Strategy:** The Landing Page itself must be statically generated (SSG via Next.js or pre-rendered Vite) and cached at the edge via a CDN (e.g., Vercel, Cloudflare). Assets, fonts, and images must be cached immutably. The frontend should literally make zero API calls until the user clicks "Start Registration".

**Handling 503s:** If the API returns a `503 Service Unavailable`, the frontend catches it gracefully: "We're experiencing incredibly high volume right now. Your place is saved, please try clicking submit again in a minute." We implement an exponential backoff retry mechanism under the hood.

---

## Q3: Duplicate Registration Prevention
*A participant tries to register twice (same email, different browser session).*

**Client-side Detection:** Before hitting the backend, we check `localStorage` or session tokens. If the user is already authenticated/registered, the registration page automatically redirects them to the `TeamDashboard` instead of showing the form.

**API Error Response:** If they circumvent client checks (e.g., incognito tab), the API will detect the unique constraint violation on the `email` column and return a `409 Conflict`. The UI catches this specific error code and displays: "This email is already registered. [Click here to log in]".

**Edge Case (Simultaneous Tabs):** If the user clicks submit in two tabs at the exact same millisecond, the backend DB handles the race condition (Unique Constraint). The first request succeeds (`201 Created`), the second fails (`409 Conflict`). The UI in the second tab simply updates to show the "already registered" state.

**Frontend-Backend Contract:** The backend must return a consistent, typed error code structure. E.g., `{ error_code: "DUPLICATE_EMAIL", message: "..." }`. The frontend reads `error_code` to trigger the specific UI flow, rather than relying on generic 400 status codes.

---

## Q4: Notification System for Announcements
*Broadcast real-time announcements to all active participants.*

**Delivery Mechanism:** We use WebSockets (or SSE) to push the announcement JSON to all connected clients. If using a service like Pusher or Firebase, clients subscribe to an `announcements` channel.

**Notification UI:** We use a dual-approach:
1. **Toast:** For immediate visibility, an animated toast pops up in the bottom right.
2. **Notification Center:** A bell icon in the Header with an unread badge. Clicking it opens a dropdown showing the history of announcements, ensuring the user can read it even if they missed the toast.

**Priority Levels:** The backend payload includes a `type` field (`urgent` | `info`). 
- `urgent`: Red banner at the top of the screen that pushes content down and requires explicit dismissal.
- `info`: Standard auto-dismissing toast notification.

**Persistence:** Notifications are stored in the backend DB. When the frontend loads, it fetches the recent notification history. The unread state is stored either in local state or synced with the backend via a `/read` endpoint.

**Different Tabs:** We use the `BroadcastChannel` API in the browser. When the WebSocket in Tab A receives the notification, it broadcasts it to Tab B. Alternatively, the Service Worker handles the incoming push and notifies all open client windows simultaneously to prevent duplicate toasts.

---

## Q5: Scaling Project Submissions in the Final Hour
*800 teams submit simultaneously between 11:30 PM and midnight.*

**Optimistic UI:** When the user clicks "Save Draft", we immediately update the UI to say "Saved locally" while the API request goes out. For the final submit, we immediately show a "Submitting..." overlay preventing further edits.

**Retry Logic for Uploads:** PDF uploads (up to 10MB) can fail under load. We implement chunked uploads or direct-to-S3 presigned URLs so the upload bypasses our main API server completely. If the API call to link the uploaded file fails, we retry up to 3 times with exponential backoff (e.g., 2s, 4s, 8s).

**Save Draft vs Final Submit:** 
- **Draft:** Hits `PUT /api/submissions/draft`. Returns `200`. UI shows a subtle "Draft auto-saved at 11:45 PM".
- **Final:** Hits `POST /api/submissions/final`. Performs strict backend validation (checking if all required fields are present). UI transitions to a massive "Success" screen.

**Connectivity Loss at 11:58 PM:** We use `localStorage` to aggressively auto-save form field inputs on every keystroke. If the user loses internet at 11:58 PM, the data remains in their browser. If they regain connection at 12:01 AM, they can still submit because the backend should allow a small grace period (e.g., 5 minutes) for timestamps generated before midnight.

**Post-deadline UX:** At exactly 00:00:00, the frontend timer hits 0. We disable all inputs (`disabled={true}`) and change the CTA button to "Submissions Closed". Any late requests sent to the API return a `403 Forbidden` which the UI catches to display a modal: "The deadline has passed. Submissions are no longer accepted."
