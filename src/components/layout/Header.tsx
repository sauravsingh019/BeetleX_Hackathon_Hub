import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const { role, setRole } = useAuthStore()
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const navigate = useNavigate()
  
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Base links everyone sees
  const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/showcase', label: 'Showcase' },
  ]

  // Links based on role
  const roleLinks = {
    public: [],
    participant: [
      { to: '/dashboard', label: 'My Team' },
      { to: '/dashboard/submit', label: 'Submit Project' },
    ],
    judge: [
      { to: '/judge', label: 'Judge Portal' },
    ],
    organizer: [
      { to: '/organizer', label: 'Command Center' },
    ],
  }

  const activeLinks = [...baseLinks, ...roleLinks[role]]

  const handleLogin = (selectedRole: 'participant' | 'judge' | 'organizer') => {
    setRole(selectedRole)
    setShowLoginModal(false)
    if (selectedRole === 'participant') navigate('/dashboard')
    if (selectedRole === 'judge') navigate('/judge')
    if (selectedRole === 'organizer') navigate('/organizer')
  }

  const handleLogout = () => {
    setRole('public')
    navigate('/')
  }

  return (
    <>
      <nav>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <NavLink to="/" className="nav-logo">Beetle<span>X</span></NavLink>
        </div>
        <div className="nav-links">
          {activeLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/' || link.to === '/dashboard'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-right">
          <div 
            onClick={toggleTheme}
            style={{ 
              width: '54px', 
              height: '28px', 
              borderRadius: '99px', 
              background: 'var(--bg3)', 
              border: '1px solid var(--border)', 
              padding: '2px', 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer', 
              position: 'relative',
              userSelect: 'none',
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)'
            }}
            className="hover-trigger"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span style={{ fontSize: '11px', position: 'absolute', left: '6px', opacity: theme === 'dark' ? 1 : 0.3, transition: 'opacity 0.2s', pointerEvents: 'none' }}>🌙</span>
            <span style={{ fontSize: '11px', position: 'absolute', right: '6px', opacity: theme === 'light' ? 1 : 0.3, transition: 'opacity 0.2s', pointerEvents: 'none' }}>☀️</span>
            
            <motion.div 
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ 
                width: '22px', 
                height: '22px', 
                borderRadius: '50%', 
                background: theme === 'light' ? '#F59E0B' : 'var(--accent)',
                boxShadow: theme === 'light' ? '0 0 10px #F59E0B' : '0 0 10px var(--accent)',
                zIndex: 1,
                marginLeft: theme === 'light' ? '26px' : '0px'
              }}
            />
          </div>
          
          {role === 'public' ? (
            <>
              <button className="btn-outline" onClick={() => setShowLoginModal(true)}>Log In</button>
              <NavLink to="/events/evt-hackfest-2025/register" className="btn-primary">
                Register Now
              </NavLink>
            </>
          ) : (
            <>
              <button className="btn-outline" style={{ padding: '0 12px', fontSize: '1.2rem', borderColor: 'transparent' }} onClick={() => navigate('/settings')}>⚙️</button>
              <button className="btn-outline" onClick={handleLogout}>Log Out</button>
            </>
          )}
        </div>
      </nav>

      {/* The Ultimate Login Popup */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              display: 'flex', 
              background: theme === 'light' ? 'rgba(240, 245, 250, 0.55)' : 'rgba(5, 5, 10, 0.45)', // Theme-aware mask
              zIndex: 9999,
              position: 'fixed',
              inset: 0,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }} 
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.93, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              style={{ 
                width: '100%', 
                maxWidth: '440px', 
                background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 15, 25, 0.85)', // Theme-aware modal background
                backdropFilter: 'blur(20px) saturate(140%)',
                WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                border: '1px solid var(--border)',
                boxShadow: theme === 'light' ? '0 24px 60px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 102, 204, 0.05)' : '0 24px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(108, 99, 255, 0.1)',
                padding: '2.5rem 2.25rem',
                borderRadius: '24px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text)' }}>Welcome back</h2>
                <button onClick={() => setShowLoginModal(false)} style={{ background: 'var(--bg2)', border: 'none', color: 'var(--text)', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', fontSize: '14px', fontWeight: 600 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Continue with GitHub
                </button>
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', fontSize: '14px', fontWeight: 600 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ height: '1px', background: 'var(--border)', flex: 1 }}></div>
                <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Or select demo role</div>
                <div style={{ height: '1px', background: 'var(--border)', flex: 1 }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline" 
                  onClick={() => handleLogin('participant')} 
                  style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-start', border: '1px solid var(--border)', background: 'var(--bg2)' }}
                >
                  <div style={{ fontSize: '24px', background: 'rgba(34,211,238,0.1)', padding: '10px', borderRadius: '8px' }}>👨‍💻</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>Participant</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-sec)' }}>Alex Chen · NullPointers</div>
                  </div>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline" 
                  onClick={() => handleLogin('judge')} 
                  style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-start', border: '1px solid var(--border)', background: 'var(--bg2)' }}
                >
                  <div style={{ fontSize: '24px', background: 'rgba(192,132,252,0.1)', padding: '10px', borderRadius: '8px' }}>⚖️</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>Judge</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-sec)' }}>Dr. Priya Sharma</div>
                  </div>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline" 
                  onClick={() => handleLogin('organizer')} 
                  style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-start', border: '1px solid var(--border)', background: 'var(--bg2)' }}
                >
                  <div style={{ fontSize: '24px', background: 'rgba(148,163,184,0.1)', padding: '10px', borderRadius: '8px' }}>⚙️</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>Organizer</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-sec)' }}>Jordan Lee · Admin</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
