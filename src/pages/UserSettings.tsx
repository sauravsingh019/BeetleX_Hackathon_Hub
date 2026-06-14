import { FadeIn, HoverCard } from '@/components/ui/animations'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'

export function UserSettings() {
  const user = useAuthStore(state => state.user)
  const role = useAuthStore(state => state.role)
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  })

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Please log in to view settings.</h2>
      </div>
    )
  }

  return (
    <FadeIn style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Account Settings</h1>
        <div style={{ color: 'var(--text-sec)' }}>Manage your profile, integrations, and preferences.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <HoverCard className="dash-card">
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Profile Information</h3>
          <div className="two-col" style={{ gap: '2rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={user.name} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" value={user.email} readOnly />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">Account Role</label>
            <div style={{ background: 'var(--bg)', padding: '10px 15px', borderRadius: '6px', color: 'var(--text-sec)', textTransform: 'capitalize' }}>
              {role}
            </div>
          </div>
        </HoverCard>

        <HoverCard className="dash-card">
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Connected Integrations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text)' }}><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.9.01.66.01 1.29.01 1.47 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"/></svg>
                <div>
                  <div style={{ fontWeight: 600 }}>GitHub</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>Connected as @{user.name.split(' ')[0].toLowerCase()}</div>
                </div>
              </div>
              <button className="btn-outline" style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>Disconnect</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <svg height="22" width="22" viewBox="0 0 127.14 96.36" fill="#5865F2"><path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.88,6.83,77.19,77.19,0,0,0,49.58,0,105.15,105.15,0,0,0,19.14,8.07C3,32.88-1.5,57,1,80.7a105.73,105.73,0,0,0,32,15.66,77.7,77.7,0,0,0,6.77-11,68.86,68.86,0,0,1-10.74-5.12c.91-.67,1.81-1.37,2.67-2.1a75.22,75.22,0,0,0,94.94,0c.86.73,1.76,1.43,2.67,2.1a68.86,68.86,0,0,1-10.74,5.12,77.7,77.7,0,0,0,6.77,11,105.73,105.73,0,0,0,32-15.66C128.9,57,124.1,32.88,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/></svg>
                <div>
                  <div style={{ fontWeight: 600 }}>Discord</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>Not connected</div>
                </div>
              </div>
              <button className="btn-outline">Connect</button>
            </div>
          </div>
        </HoverCard>

        <HoverCard className="dash-card">
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Notifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Email Alerts</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>Receive hackathon updates via email.</div>
              </div>
              <input type="checkbox" checked={notifications.email} onChange={e => setNotifications({...notifications, email: e.target.checked})} style={{ width: '20px', height: '20px' }} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Push Notifications</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>Receive real-time alerts in the browser.</div>
              </div>
              <input type="checkbox" checked={notifications.push} onChange={e => setNotifications({...notifications, push: e.target.checked})} style={{ width: '20px', height: '20px' }} />
            </label>
          </div>
        </HoverCard>

      </div>
    </FadeIn>
  )
}
