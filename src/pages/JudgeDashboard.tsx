import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn, StaggeredList, HoverCard } from '@/components/ui/animations'
import { motion, AnimatePresence } from 'framer-motion'

export function JudgeDashboard() {
  const [showConfidentiality, setShowConfidentiality] = useState(true)

  const pendingReviews = [
    { id: 'proj-441', title: 'NeuralSearch API', team: 'NullPointers', track: 'AI / ML', avgScore: 88.5 },
    { id: 'proj-442', title: 'ZK-Rollup Dex', team: 'BlockBuilders', track: 'Web3', avgScore: 92.0 },
    { id: 'proj-443', title: 'HealthSync', team: 'DataPunks', track: 'Open Track', avgScore: 75.4 },
  ]

  const completedReviews = [
    { id: 'proj-301', title: 'Agentic Workflow', team: 'AlphaNeural', score: 94, date: 'Aug 18, 2025' },
    { id: 'proj-302', title: 'DAO Governance', team: 'ChainLinkers', score: 82, date: 'Aug 18, 2025' },
  ]

  return (
    <>
      <FadeIn className="dash-container">
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: '0.25rem' }}>EVALUATION PORTAL</div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Judge Dashboard</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Pending</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>3 Projects</div>
          </div>
        </div>

        <StaggeredList>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Action Required
                <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--red)', borderRadius: '50%' }}></span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {pendingReviews.map(proj => (
                  <HoverCard key={proj.id} className="dash-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <span className="badge">{proj.track}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'monospace' }}>{proj.id}</span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{proj.title}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-sec)', marginBottom: '1.5rem' }}>By {proj.team}</div>
                    
                    {/* Comparative Metric */}
                    <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '4px' }}>Current Average Score</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: proj.avgScore > 90 ? 'var(--green)' : 'var(--text)' }}>{proj.avgScore.toFixed(1)}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-sec)' }}>/ 100</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'var(--bg2)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${proj.avgScore}%`, height: '100%', background: proj.avgScore > 90 ? 'var(--green)' : 'var(--accent)' }}></div>
                      </div>
                    </div>

                    <Link to={`/judge/review/${proj.id}`} style={{ textDecoration: 'none' }}>
                      <button className="btn-primary" style={{ width: '100%' }}>Start Evaluation →</button>
                    </Link>
                  </HoverCard>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem' }}>Recently Evaluated</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {completedReviews.map(proj => (
                  <div key={proj.id} className="dash-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{proj.title} <span style={{ fontSize: '12px', color: 'var(--text-sec)', fontWeight: 400 }}>({proj.team})</span></div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Evaluated on {proj.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text3)' }}>Your Score</div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: proj.score >= 90 ? 'var(--green)' : 'var(--text)' }}>{proj.score}</div>
                      </div>
                      <button className="btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StaggeredList>
      </FadeIn>

      <AnimatePresence>
        {showConfidentiality && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="dash-card" style={{ maxWidth: '500px', width: '90%', padding: '2.5rem' }}
            >
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🔒</div>
              <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Confidentiality Agreement</h2>
              <p style={{ color: 'var(--text-sec)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '14px' }}>
                As a judge for BeetleX HackFest 2025, you will have access to unreleased source code, proprietary algorithms, and sensitive intellectual property submitted by participants. 
                <br/><br/>
                By proceeding, you agree to the Non-Disclosure terms and confirm you will not replicate or distribute any materials viewed during the evaluation period.
              </p>
              <button className="btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={() => setShowConfidentiality(false)}>
                I Agree & Accept
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
