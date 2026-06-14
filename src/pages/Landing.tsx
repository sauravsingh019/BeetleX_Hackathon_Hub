import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HolographicCard } from '@/components/ui/animations'
import { CipherText } from '@/components/ui/CipherText'

export function Landing() {
  return (
    <>
      {/* Hero */}
      <div className="hero" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-content">
          <div className="hero-badge"><span className="dot"></span> Applications Open — 12 days left</div>
          <h1 style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ color: 'var(--text)' }}>Build What Matters.</span>
            <span className="grad">Win What Counts.</span>
          </h1>
          <p style={{ marginTop: '20px' }}>BeetleX HackFest 2025 — 72 hours, $50,000 in prizes, and a chance to ship something that changes how developers work.</p>
          <div className="hero-dates">
            <div className="hero-date"><div className="label">Registration Opens</div><div className="val">July 1, 2025</div></div>
            <div className="hero-date"><div className="label">Hackathon Begins</div><div className="val">Aug 15, 2025</div></div>
            <div className="hero-date"><div className="label">Submission Deadline</div><div className="val">Aug 18, 2025</div></div>
            <div className="hero-date"><div className="label">Winners Announced</div><div className="val">Aug 22, 2025</div></div>
          </div>
          <div className="hero-cta">
            <Link to="/events/evt-hackfest-2025/register"><button className="btn-primary hover-trigger">Register Free →</button></Link>
            <Link to="/events"><button className="btn-outline hover-trigger">Browse All Events</button></Link>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="section" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header">
          <div className="section-eyebrow">About the Hackathon</div>
          <div className="section-title">Built for Developers, By Developers</div>
          <div className="section-sub">No buzzwords. Just real engineers solving real problems in 72 hours. Open to all skill levels.</div>
        </div>
        <div className="about-grid">
          <HolographicCard className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Agentic Workflows</h3>
            <p>Connect multiple AI agents to collaborate on your repositories during the hackathon.</p>
          </HolographicCard>
          
          <HolographicCard className="feature-card">
            <div className="feature-icon">⛓️</div>
            <h3>On-Chain Judging</h3>
            <p>All judge evaluations and scores are immutably stored on the blockchain for transparency.</p>
          </HolographicCard>

          <HolographicCard className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Zero-Latency Sync</h3>
            <p>Watch the leaderboard update in real-time as judges submit their final scores.</p>
          </HolographicCard>

          <HolographicCard className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Mentorship</h3>
            <p>Get instant debugging, architectural critiques, and code optimization from 24/7 AI-native mentors.</p>
          </HolographicCard>

          <HolographicCard className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Developer Sandboxes</h3>
            <p>Spin up isolated serverless environments and database instances with one click from your dashboard.</p>
          </HolographicCard>

          <HolographicCard className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Real Prizes</h3>
            <p>$50,000 across 4 tracks. Plus investment conversations with our Web3 and AI portfolio.</p>
          </HolographicCard>
        </div>
      </div>

      {/* Timeline + Prizes */}
      <div className="section" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header">
          <div className="section-eyebrow">Timeline</div>
          <div className="section-title">Key Dates to Remember</div>
        </div>
        <div className="two-col">
          <div className="timeline">
            <div className="tl-item"><div className="tl-dot done"></div><div className="tl-date">July 1, 2025</div><div className="tl-title">Registration Opens</div><div className="tl-sub">Individual and team registration begins</div></div>
            <div className="tl-item"><div className="tl-dot done"></div><div className="tl-date">July 28, 2025</div><div className="tl-title">Team Formation Closes</div><div className="tl-sub">All teams must be locked in</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-date">Aug 15, 2025 · 09:00 IST</div><div className="tl-title">Hackathon Begins</div><div className="tl-sub">Problem statements released. Clocks start.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-date">Aug 18, 2025 · 23:59 IST</div><div className="tl-title">Submissions Close</div><div className="tl-sub">Hard deadline — no extensions</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-date">Aug 19–21, 2025</div><div className="tl-title">Judging Period</div><div className="tl-sub">Panel reviews all submissions</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-date">Aug 22, 2025</div><div className="tl-title">Winners Announced</div><div className="tl-sub">Live stream + winner interviews</div></div>
          </div>
          {/* Prizes */}
          <div>
            <div className="section-eyebrow" style={{marginBottom:'1rem'}}>Prizes & Tracks</div>
            <div className="prize-grid">
              <HolographicCard className="prize-card first"><div className="prize-place">🥇 Grand Prize</div><div className="prize-amt">$20K</div><div className="prize-track">Open Track</div></HolographicCard>
              <HolographicCard className="prize-card"><div className="prize-place">🥈 Runner Up</div><div className="prize-amt">$10K</div><div className="prize-track">Open Track</div></HolographicCard>
              <HolographicCard className="prize-card"><div className="prize-place">🏅 AI Track</div><div className="prize-amt">$10K</div><div className="prize-track">AI / ML</div></HolographicCard>
              <HolographicCard className="prize-card"><div className="prize-place">🏅 Web3 Track</div><div className="prize-amt">$10K</div><div className="prize-track">Blockchain</div></HolographicCard>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <div className="section" style={{textAlign:'center', position: 'relative', zIndex: 10}}>
        <div className="section-eyebrow">Sponsors</div>
        <div className="section-title" style={{marginBottom:'2rem'}}>Backed by Industry Leaders</div>
        <div className="sponsors-grid">
          <div className="sponsor-chip hover-trigger">Anthropic</div>
          <div className="sponsor-chip hover-trigger">Solana Foundation</div>
          <div className="sponsor-chip hover-trigger">Vercel</div>
          <div className="sponsor-chip hover-trigger">Supabase</div>
          <div className="sponsor-chip hover-trigger">Alchemy</div>
          <div className="sponsor-chip hover-trigger">AWS Activate</div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section" style={{maxWidth:'700px', position: 'relative', zIndex: 10}}>
        <div className="section-header">
          <div className="section-eyebrow">FAQ</div>
          <div className="section-title">Common Questions</div>
        </div>
        <FaqItem q="Who can participate?" a="Anyone with a laptop and curiosity. Students, working professionals, and indie devs are all welcome. You must be 16+ to register. Teams can include people from different countries." />
        <FaqItem q="Is it free?" a="Registration is completely free. If you're attending in person at the Bangalore hub, meals are provided. Remote participants just need internet access." />
        <FaqItem q="Can I participate solo?" a="Yes. You can register as an individual. We also have a team-matching feature if you'd like to find collaborators before the event starts." />
        <FaqItem q="What should I build?" a="Problem statements are revealed when the hackathon starts, but you can choose any technology track. The Open Track accepts projects in any domain." />
        <FaqItem q="How are winners judged?" a="Projects are scored on Innovation (30%), Technical Execution (30%), Impact (25%), and Presentation (15%). Each project is reviewed by at least two independent judges." />
      </div>
    </>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item hover-trigger">
      <button className={`faq-q ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {q} <span className="arrow">+</span>
      </button>
      <div className={`faq-a ${open ? 'open' : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  )
}
