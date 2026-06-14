import { useState, useEffect } from 'react'
import { FadeIn, HoverCard } from '@/components/ui/animations'
import { motion } from 'framer-motion'

export function ProjectSubmission() {
  const [timer, setTimer] = useState(2 * 3600 + 14 * 60 + 22)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000)
    return () => clearInterval(iv)
  }, [])

  const fmt = (tot: number) => {
    const h = Math.floor(tot / 3600), m = Math.floor((tot % 3600) / 60), s = tot % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const submitProject = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <FadeIn className="sub-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ marginBottom: '1rem' }}>Project Submitted Successfully!</h1>
        <p style={{ color: 'var(--text-sec)', marginBottom: '2rem' }}>Your project "NeuralSearch API" has been received. Judges will begin evaluation shortly.</p>
        <button className="btn-outline" onClick={() => window.history.back()}>Return to Dashboard</button>
      </FadeIn>
    )
  }

  return (
    <FadeIn className="sub-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Submit Project</h1>
          <div style={{ color: 'var(--text-sec)' }}>Team NullPointers · AI/ML Track</div>
        </div>
        <HoverCard className="dash-card" style={{ padding: '12px 20px', background: timer < 3600 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg2)', border: timer < 3600 ? '1px solid var(--red)' : '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '4px' }}>Time Remaining</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--mono)', color: timer < 3600 ? 'var(--red)' : 'var(--text)' }}>
            {fmt(timer)}
          </div>
        </HoverCard>
      </div>

      <div className="progress-bar" style={{ marginBottom: '3rem' }}>
        {[1, 2, 3].map((s, index) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: index === 2 ? 'none' : 1 }}>
            <motion.div 
              animate={{ scale: step === s ? 1.2 : 1 }}
              className={`step-node ${step > s ? 'done' : step === s ? 'active' : ''}`}
            >
              {step > s ? '✓' : s}
            </motion.div>
            {index < 2 && <div className={`step-line ${step > s ? 'done' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="dash-card">
        {step === 1 && (
          <FadeIn>
            <h3 style={{ marginBottom: '1.5rem' }}>Basic Information</h3>
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input className="form-input" placeholder="e.g. NeuralSearch API" defaultValue="NeuralSearch API" />
            </div>
            <div className="form-group">
              <label className="form-label">Tagline (One sentence) *</label>
              <input className="form-input" placeholder="Semantic search layer for Postgres" defaultValue="Semantic search layer for Postgres" />
            </div>
            <div className="form-group">
              <label className="form-label">Detailed Description</label>
              <textarea className="form-input" rows={5} placeholder="Describe what it does, how you built it, and challenges you ran into..." defaultValue="A high-performance semantic search API built on top of customized transformer models. It allows developers to plug-and-play neural search into existing Postgres databases without managing vector embeddings manually." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn-primary" onClick={() => setStep(2)}>Next Step →</button>
            </div>
          </FadeIn>
        )}

        {step === 2 && (
          <FadeIn>
            <h3 style={{ marginBottom: '1.5rem' }}>Links & Assets</h3>
            <div className="form-group">
              <label className="form-label">GitHub Repository URL *</label>
              <input className="form-input" placeholder="https://github.com/..." defaultValue="https://github.com/arjun/neuralsearch" />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL (Optional)</label>
              <input className="form-input" placeholder="https://..." defaultValue="https://neuralsearch.vercel.app" />
            </div>
            <div className="form-group">
              <label className="form-label">Pitch Video URL (YouTube/Vimeo)</label>
              <input className="form-input" placeholder="https://youtube.com/watch?v=..." defaultValue="https://youtube.com/watch?v=dQw4w9WgXcQ" />
            </div>
            <div className="form-group">
              <label className="form-label">Upload Architecture Diagram (PDF/PNG)</label>
              <div style={{ border: '2px dashed var(--border)', padding: '2rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', background: 'var(--bg)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
                <div style={{ fontWeight: 600 }}>architecture_diagram.pdf</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>2.4 MB</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Next Step →</button>
            </div>
          </FadeIn>
        )}

        {step === 3 && (
          <FadeIn>
            <h3 style={{ marginBottom: '1.5rem' }}>Final Review</h3>
            <div style={{ background: 'var(--bg3)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-sec)', marginBottom: '8px' }}>Project Name</div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>NeuralSearch API</div>
            </div>
            <div style={{ background: 'var(--bg3)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-sec)', marginBottom: '8px' }}>Repository</div>
              <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>github.com/arjun/neuralsearch</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '2rem', padding: '1rem', background: 'rgba(34,211,238,0.1)', border: '1px solid var(--accent)', borderRadius: '8px' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
                By submitting, you confirm that this project was created during the hackathon period and complies with all rules. Once the timer reaches 00:00:00, you will no longer be able to edit these details.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="btn-outline" onClick={() => setStep(2)} disabled={isSubmitting}>← Back</button>
              <button className="btn-primary" onClick={submitProject} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting to Blockchain...' : 'Confirm Final Submission 🚀'}
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </FadeIn>
  )
}
