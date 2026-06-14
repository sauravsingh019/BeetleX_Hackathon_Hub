import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, type LeaderboardEntry } from '@/api/mockApi'
import { FadeIn, StaggeredList, HoverCard } from '@/components/ui/animations'

export function TeamDashboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  
  // Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Register all team members', done: true },
    { id: 2, text: 'Select hackathon track', done: true },
    { id: 3, text: 'Setup GitHub repository', done: false },
    { id: 4, text: 'Draft architecture diagram', done: false },
    { id: 5, text: 'Submit initial pitch video', done: false },
  ])

  useEffect(() => {
    api.getLeaderboard().then(data => {
      setLeaderboard(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (loading) return
    const iv = setInterval(() => {
      setLeaderboard(prev => {
        const updated = prev.map(t => ({
          ...t,
          score: Math.min(100, Math.max(0, t.score + (Math.random() * 2 - 0.5)))
        }))
        updated.sort((a, b) => b.score - a.score)
        return updated.map((t, idx) => ({ ...t, rank: idx + 1 }))
      })
    }, 5000)
    return () => clearInterval(iv)
  }, [loading])

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast('🚨 Submission deadline extended by 30 minutes!')
      setTimeout(() => setToast(null), 8000)
    }, 12000)
    return () => clearTimeout(timer)
  }, [])

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c))
  }

  // Mock GitHub Graph Generator
  const generateCommitGraph = () => {
    const weeks = []
    for (let i = 0; i < 24; i++) {
      const days = []
      for (let j = 0; j < 7; j++) {
        const intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0
        days.push(intensity)
      }
      weeks.push(days)
    }
    return weeks
  }
  const [commitGraph] = useState(generateCommitGraph())

  return (
    <FadeIn style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      
      {toast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: 'var(--accent)', color: 'white', padding: '12px 20px', borderRadius: '8px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', animation: 'pulse 2s infinite' }}>
          {toast}
        </div>
      )}

      <div style={{ marginBottom: '2.5rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>TEAM DASHBOARD</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>NullPointers 🚀</h1>
          <div style={{ fontSize: '14px', color: 'var(--text2)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span>BeetleX HackFest 2025</span>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span style={{ color: 'var(--accent)' }}>AI / ML Track</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Time Remaining</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--red)', letterSpacing: '0.5px' }}>14:08:45:22</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem', alignItems: 'flex-start', paddingBottom: '6rem' }}>
        
        {/* Main Content Area */}
        <StaggeredList style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: 0 }}>
          
          <HoverCard className="dash-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Team Roster <span className="badge">3/4</span></h3>
              <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>+ Invite</button>
            </div>
            <div className="team-members">
              <div className="member-row">
                <div className="member-avatar a1">AS</div>
                <div className="member-info"><div className="member-name">Arjun Sharma</div><div className="member-role">Frontend Developer</div></div>
                <div className="member-badge">Lead</div>
              </div>
              <div className="member-row">
                <div className="member-avatar a2">PK</div>
                <div className="member-info"><div className="member-name">Priya Kumar</div><div className="member-role">ML Engineer</div></div>
              </div>
            </div>
            <div className="invite-box" style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Invite link:</div>
              <div className="invite-code">BXHF-NP-4K2T</div>
              <button className="copy-btn">Copy</button>
            </div>
          </HoverCard>

          <HoverCard className="dash-card" style={{ height: '100%' }}>
            <h3>Submission Status</h3>
            <div className="status-tracker" style={{ marginTop: '1.5rem' }}>
              <div className="status-item"><div className="status-dot done"></div><div className="status-label">Team registered</div><div className="status-val">Done</div></div>
              <div className="status-item"><div className="status-dot done"></div><div className="status-label">Track selected</div><div className="status-val">AI / ML</div></div>
              <div className="status-item"><div className="status-dot progress"></div><div className="status-label">Project in progress</div><div className="status-val">Building</div></div>
            </div>
            <Link to="/dashboard/submit">
              <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Go to Submission Wizard →</button>
            </Link>
          </HoverCard>

          {/* Interactive Checklist */}
          <HoverCard className="dash-card" style={{ height: '100%' }}>
            <h3>Hackathon Preparation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '1rem' }}>
              {checklist.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleCheck(item.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', 
                    padding: '8px', borderRadius: '6px', cursor: 'pointer',
                    background: item.done ? 'var(--bg)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ 
                    width: '18px', height: '18px', borderRadius: '4px', 
                    border: `2px solid ${item.done ? 'var(--accent)' : 'var(--border)'}`,
                    background: item.done ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {item.done && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                  </div>
                  <span style={{ 
                    fontSize: '14px', 
                    color: item.done ? 'var(--text3)' : 'var(--text)',
                    textDecoration: item.done ? 'line-through' : 'none'
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </HoverCard>

          {/* Mock GitHub Graph */}
          <HoverCard className="dash-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3>Team Velocity (Commits)</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '1rem', flex: 1 }}>
              {/* Y-axis Labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9px', color: 'var(--text3)', marginRight: '4px', justifyContent: 'space-between', height: '108px' }}>
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              {/* Graph Grid */}
              <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px', flex: 1, justifyContent: 'space-between' }}>
                {commitGraph.map((week, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {week.map((intensity, j) => (
                      <div 
                        key={j} 
                        style={{ 
                          width: '12px', height: '12px', borderRadius: '2px',
                          background: intensity === 0 ? 'var(--bg3)' : 
                                    intensity === 1 ? 'rgba(108, 99, 255, 0.25)' : 
                                    intensity === 2 ? 'rgba(108, 99, 255, 0.5)' : 
                                    intensity === 3 ? 'rgba(108, 99, 255, 0.75)' : 'var(--accent)'
                        }} 
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '1rem' }}>47 commits this week</div>
          </HoverCard>

          {/* Resource Hub */}
          <HoverCard className="dash-card" style={{ background: 'var(--bg2)', height: '100%' }}>
            <h3>Resource Hub</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '1.5rem' }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '20px' }}>📚</span>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>API Docs</div>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '20px' }}>🎨</span>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Figma UI Kit</div>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '20px' }}>☁️</span>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Cloud Credits</div>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '20px' }}>⚖️</span>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Rules & Judging</div>
              </a>
            </div>
          </HoverCard>

          <HoverCard className="dash-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Live Leaderboard</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
                <span style={{ fontSize: '10px', color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live</span>
              </div>
            </div>
            <div className="leaderboard-mini" style={{ position: 'relative', minHeight: '230px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text3)' }}>Loading scores...</div>
              ) : (
                leaderboard.map((team) => (
                  <div 
                    key={team.team} 
                    className={`lb-row ${team.isCurrentUser ? 'your-row' : ''}`}
                    style={{ 
                      position: 'absolute', 
                      width: '100%',
                      top: `${(team.rank - 1) * 45}px`,
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                    }}
                  >
                    <div className={`lb-rank ${team.rank <= 2 ? 'top' : ''}`} style={team.isCurrentUser ? { color: 'var(--accent)' } : {}}>{team.rank}</div>
                    <div className="lb-team" style={team.isCurrentUser ? { color: 'var(--accent)' } : {}}>
                      {team.team} {team.isCurrentUser ? '← You' : ''}
                    </div>
                    <div className="lb-score">{team.score.toFixed(1)}</div>
                  </div>
                ))
              )}
            </div>
          </HoverCard>
        </StaggeredList>

        {/* Right Sidebar: Announcements */}
        <div style={{ width: '340px', flexShrink: 0 }}>
          <HoverCard className="dash-card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Announcements
              <span style={{ background: 'var(--red)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>New</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>10 mins ago</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Submission Deadline Extended</div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.4 }}>Good news! We have extended the final submission deadline by 30 minutes due to server load.</div>
              </div>

              <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>2 hours ago</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Mentor Office Hours</div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.4 }}>Join the Discord voice channel at 2 PM EST for live technical assistance from the Vercel team.</div>
              </div>

              <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>1 day ago</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Hacking Begins!</div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.4 }}>The repository templates are now public. Good luck everyone!</div>
              </div>
            </div>
            
            <button className="btn-outline" style={{ width: '100%', marginTop: '2rem', fontSize: '12px' }}>View All History</button>
          </HoverCard>
        </div>

      </div>
    </FadeIn>
  )
}
