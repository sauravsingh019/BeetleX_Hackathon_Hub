import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn, HoverCard } from '@/components/ui/animations'

export function EventDetails() {
  const [seconds, setSeconds] = useState(22)

  useEffect(() => {
    const iv = setInterval(() => setSeconds(s => (s - 1 + 60) % 60), 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <FadeIn>
      <div className="detail-header" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Glow orb effect */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(40px)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
            <span className="ev-badge active-b"><span className="bdot"></span> Active</span>
            <span className="ev-badge" style={{ background: 'var(--bg3)' }}>AI / ML</span>
          </div>
          <h1>BeetleX HackFest 2025</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-sec)', maxWidth: '600px', marginBottom: '2rem' }}>
            A 72-hour global hackathon challenging developers to push the boundaries of Agentic AI, Web3 infrastructure, and Open Source tooling.
          </p>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '14px' }}>
            <div>
              <div style={{ color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', marginBottom: '4px' }}>Prize Pool</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>$50,000</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', marginBottom: '4px' }}>Participants</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>1,240</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', marginBottom: '4px' }}>Location</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Global (Remote)</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          
          {/* Sponsors Marquee */}
          <div style={{ marginBottom: '4rem', overflow: 'hidden', padding: '1rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', marginBottom: '1rem' }}>Sponsored By</div>
            <div style={{ display: 'flex', gap: '4rem', justifyContent: 'center', opacity: 0.5 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>OpenAI</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>Vercel</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>Supabase</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>Stripe</div>
            </div>
          </div>

          <h2>About the Hackathon</h2>
          <p style={{ color: 'var(--text-sec)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Welcome to the flagship event of the year. BeetleX HackFest brings together the brightest minds in the developer ecosystem. Whether you are building autonomous agents, deploying zero-knowledge proofs, or creating the next big open-source library, this is your arena.
          </p>

          <h2 style={{ marginTop: '3rem' }}>Timeline</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>Registration Opens</h4>
                <div className="tl-date">August 1, 2025</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="tl-dot active"></div>
              <div className="tl-content">
                <h4>Hacking Begins</h4>
                <div className="tl-date">August 15, 2025 · 10:00 AM EST</div>
                <p>Opening ceremony and team formation mixer.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <div className="tl-content">
                <h4>Submission Deadline</h4>
                <div className="tl-date">August 18, 2025 · 10:00 AM EST</div>
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Registration Sidebar */}
        <div style={{ width: '340px', flexShrink: 0, position: 'sticky', top: '100px' }}>
          <HoverCard className="dash-card" style={{ padding: '2rem', border: '1px solid var(--accent)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Ready to build?</h3>
            <div className="countdown">
              <div className="cd-box"><div className="cd-val">14</div><div className="cd-lbl">Days</div></div>
              <div className="cd-box"><div className="cd-val">08</div><div className="cd-lbl">Hours</div></div>
              <div className="cd-box"><div className="cd-val">45</div><div className="cd-lbl">Mins</div></div>
              <div className="cd-box"><div className="cd-val" style={{ color: 'var(--accent)' }}>{seconds}</div><div className="cd-lbl">Secs</div></div>
            </div>
            
            <Link to="/events/evt-hackfest-2025/register" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
                Register Now
              </button>
            </Link>
            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text3)' }}>
              Registration closes in 14 days. <br/> Free to participate.
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-sec)', marginBottom: '1rem' }}>Prize Breakdown</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span>🥇 1st Place</span><span style={{ fontWeight: 700 }}>$20,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span>🥈 2nd Place</span><span style={{ fontWeight: 700 }}>$10,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span>🥉 3rd Place</span><span style={{ fontWeight: 700 }}>$5,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-sec)' }}>Track Winners (x3)</span><span style={{ fontWeight: 700 }}>$5,000</span>
              </div>
            </div>
          </HoverCard>
        </div>

      </div>
    </FadeIn>
  )
}
