import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/api/mockApi'
import { FadeIn, HoverCard } from '@/components/ui/animations'
import { motion } from 'framer-motion'

export function Registration() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [teamSelection, setTeamSelection] = useState<'create' | 'join' | 'solo'>('create')
  const [trackSelection, setTrackSelection] = useState<string>('ai')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    org: '',
    role: '',
    teamName: '',
    inviteCode: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [regId, setRegId] = useState('')

  // Terminal Typing Effect State
  const [typedText, setTypedText] = useState('')
  const fullText = "Initializing workspace... Allocating resources... Welcome to the matrix."

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required'
    if (!formData.org) newErrors.org = 'Organization is required'
    if (!formData.role || formData.role === 'Select your primary role') newErrors.role = 'Role is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }
    return true
  }

  const goStep = (step: number) => {
    if (step === 2 && currentStep === 1) {
      if (!validateStep1()) return
    }
    setCurrentStep(step)
    window.scrollTo(0, 0)

    if (step === 5) {
      // Start typing effect
      let i = 0
      setTypedText('')
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i))
        i++
        if (i > fullText.length) clearInterval(interval)
      }, 50)
    }
  }

  const completeReg = async () => {
    setIsSubmitting(true)
    setErrors({})
    try {
      const result = await api.registerParticipant(formData)
      if (result.success) {
        setRegId(result.registrationId)
        goStep(5)
      }
    } catch (e: any) {
      if (e.message === 'DUPLICATE_EMAIL') {
        alert('This email is already registered! Please log in instead.')
        goStep(1)
        setErrors({ email: 'Email already registered' })
      } else {
        alert('An error occurred during registration.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn className="reg-container">
      <div className="reg-header">
        <h1>Register for HackFest 2025</h1>
        <div style={{ fontSize: '14px', color: 'var(--text-sec)' }}>BeetleX HackFest · Aug 15–18, 2025</div>
      </div>

      <div className="progress-bar">
        {[1, 2, 3, 4, 5].map((step, index) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: index === 4 ? 'none' : 1 }}>
            <motion.div 
              animate={{ scale: currentStep === step ? 1.2 : 1 }}
              className={`step-node ${currentStep > step ? 'done' : currentStep === step ? 'active' : ''}`}
            >
              {currentStep > step || step === 5 && currentStep === 5 ? '✓' : step}
            </motion.div>
            {index < 4 && <div className={`step-line ${currentStep > step ? 'done' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="form-card">
        {/* Step 1: Personal Info */}
        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '1.25rem' }}>Personal Information</h3>
          <div className="two-col">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input className={`form-input ${errors.firstName ? 'error' : ''}`} name="firstName" value={formData.firstName} onChange={handleInput} placeholder="Arjun" />
              {errors.firstName && <div className="form-error" style={{ color: 'var(--red)', fontSize: '12px' }}>{errors.firstName}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input className={`form-input ${errors.lastName ? 'error' : ''}`} name="lastName" value={formData.lastName} onChange={handleInput} placeholder="Sharma" />
              {errors.lastName && <div className="form-error" style={{ color: 'var(--red)', fontSize: '12px' }}>{errors.lastName}</div>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className={`form-input ${errors.email ? 'error' : ''}`} name="email" value={formData.email} onChange={handleInput} type="email" placeholder="duplicate@example.com (try this to see error)" />
            {errors.email && <div className="form-error" style={{ color: 'var(--red)', fontSize: '12px' }}>{errors.email}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">College / Organization *</label>
            <input className={`form-input ${errors.org ? 'error' : ''}`} name="org" value={formData.org} onChange={handleInput} placeholder="IIT Delhi" />
            {errors.org && <div className="form-error" style={{ color: 'var(--red)', fontSize: '12px' }}>{errors.org}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Your Role *</label>
            <select className={`form-input ${errors.role ? 'error' : ''}`} name="role" value={formData.role} onChange={handleInput}>
              <option>Select your primary role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>AI / ML Engineer</option>
            </select>
            {errors.role && <div className="form-error" style={{ color: 'var(--red)', fontSize: '12px' }}>{errors.role}</div>}
          </div>
          <div className="form-nav">
            <button className="btn-primary w-full" onClick={() => goStep(2)}>Next: Team Setup →</button>
          </div>
        </div>

        {/* Step 2: Team Setup */}
        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '1.25rem' }}>Team Setup</h3>
          
          <HoverCard>
            <div className={`team-option ${teamSelection === 'create' ? 'selected' : ''}`} onClick={() => setTeamSelection('create')}>
              <h4>🚀 Create a New Team</h4><p>Start fresh and invite up to 3 teammates</p>
            </div>
          </HoverCard>
          <HoverCard>
            <div className={`team-option ${teamSelection === 'join' ? 'selected' : ''}`} onClick={() => setTeamSelection('join')}>
              <h4>🔗 Join an Existing Team</h4><p>Enter the invite code shared by your team lead</p>
            </div>
          </HoverCard>
          <HoverCard>
            <div className={`team-option ${teamSelection === 'solo' ? 'selected' : ''}`} onClick={() => setTeamSelection('solo')}>
              <h4>🧑 Participate Solo</h4><p>Register as an individual</p>
            </div>
          </HoverCard>
          
          {teamSelection === 'create' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="form-group mt1">
              <label className="form-label">Team Name</label>
              <input className="form-input" name="teamName" value={formData.teamName} onChange={handleInput} placeholder="e.g. NullPointers" />
            </motion.div>
          )}
          {teamSelection === 'join' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="form-group mt1">
              <label className="form-label">Invite Code</label>
              <input className="form-input" name="inviteCode" value={formData.inviteCode} onChange={handleInput} placeholder="e.g. BXHF-7X2K" />
            </motion.div>
          )}

          <div className="form-nav">
            <button className="btn-outline" onClick={() => goStep(1)}>← Back</button>
            <button className="btn-primary" onClick={() => goStep(3)}>Next: Track →</button>
          </div>
        </div>

        {/* Step 3: Track Selection */}
        <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '1.25rem' }}>Choose Your Track</h3>
          
          <HoverCard>
            <div className={`track-card ${trackSelection === 'ai' ? 'selected' : ''}`} onClick={() => setTrackSelection('ai')}>
              <div className="track-icon">🤖</div><div><h4>AI / ML Track</h4><p>$10K prize pool.</p></div>
            </div>
          </HoverCard>
          <HoverCard>
            <div className={`track-card ${trackSelection === 'web3' ? 'selected' : ''}`} onClick={() => setTrackSelection('web3')}>
              <div className="track-icon">⛓️</div><div><h4>Web3 Track</h4><p>$10K prize pool.</p></div>
            </div>
          </HoverCard>
          <HoverCard>
            <div className={`track-card ${trackSelection === 'open' ? 'selected' : ''}`} onClick={() => setTrackSelection('open')}>
              <div className="track-icon">🌐</div><div><h4>Open Track</h4><p>$20K prize pool.</p></div>
            </div>
          </HoverCard>
          
          <div className="form-nav">
            <button className="btn-outline" onClick={() => goStep(2)}>← Back</button>
            <button className="btn-primary" onClick={() => goStep(4)}>Next: Review →</button>
          </div>
        </div>

        {/* Step 4: Review */}
        <div className={`form-step ${currentStep === 4 ? 'active' : ''}`}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '1.25rem' }}>Review & Submit</h3>
          
          <div style={{ background: 'var(--bg3)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-sec)' }}>Personal Info</span>
              <span style={{ fontSize: '12px', color: 'var(--accent)', cursor: 'pointer' }} onClick={() => goStep(1)}>Edit</span>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text)' }}>{formData.firstName} {formData.lastName} · {formData.email}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-sec)' }}>{formData.org} · {formData.role}</div>
          </div>

          <div style={{ background: 'var(--bg3)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-sec)' }}>Team</span>
              <span style={{ fontSize: '12px', color: 'var(--accent)', cursor: 'pointer' }} onClick={() => goStep(2)}>Edit</span>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text)' }}>{teamSelection === 'create' ? formData.teamName : teamSelection === 'join' ? formData.inviteCode : 'Solo'}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-sec)' }}>{teamSelection === 'create' ? 'Creating new team' : teamSelection === 'join' ? 'Joining via code' : 'Solo Participation'}</div>
          </div>

          <div className="form-nav">
            <button className="btn-outline" onClick={() => goStep(3)} disabled={isSubmitting}>← Back</button>
            <button className="btn-primary" onClick={completeReg} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Registration →'}
            </button>
          </div>
        </div>

        {/* Step 5: Confirmation */}
        <div className={`form-step ${currentStep === 5 ? 'active' : ''}`}>
          <div className="confirm-card">
            <div className="success-icon">🎉</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>You're In!</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-sec)', marginBottom: '1.5rem' }}>Welcome to BeetleX HackFest 2025, {formData.firstName}.</p>
            
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--green)', minHeight: '40px', marginBottom: '1.5rem', textAlign: 'left' }}>
              &gt; {typedText}<span className="blink">_</span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-sec)', marginBottom: '0.5rem', letterSpacing: '1px' }}>YOUR REGISTRATION ID</div>
            <div className="confirm-id">{regId}</div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => navigate('/')}>Return Home</button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
