import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, type HackathonEvent } from '@/api/mockApi'
import { FadeIn, HoverCard, StaggeredList } from '@/components/ui/animations'

export function EventListing() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [events, setEvents] = useState<HackathonEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    api.getEvents().then(data => {
      setEvents(data)
      setLoading(false)
    })
  }, [])

  const filteredEvents = events.filter(e => {
    if (activeFilter === 'All') return true
    if (activeFilter.includes('Active')) return e.status === 'active'
    if (activeFilter.includes('Upcoming')) return e.status === 'upcoming'
    if (activeFilter.includes('Closed')) return e.status === 'closed'
    return e.track.includes(activeFilter) || activeFilter.includes(e.track)
  })

  const renderEventCard = (ev: HackathonEvent) => {
    const isRecommended = ev.isRecommended
    const badgeClass = ev.status === 'active' ? 'active-b' : ev.status === 'upcoming' ? 'upcoming-b' : 'closed-b'
    const badgeText = ev.status.charAt(0).toUpperCase() + ev.status.slice(1)
    
    if (viewMode === 'list') {
      return (
        <HoverCard key={ev.id}>
          <Link to={`/events/${ev.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={`event-card ${ev.status === 'active' ? 'active-ev' : ev.status}`} style={{ display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                {isRecommended && <div style={{ fontSize: '11px', color: 'var(--accent3)', fontWeight: 600, marginBottom: '8px' }}>⭐ AI Recommended for You</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div className={`ev-badge ${badgeClass}`} style={{ margin: 0 }}><span className="bdot"></span> {badgeText}</div>
                  <h3 style={{ margin: 0 }}>{ev.title}</h3>
                </div>
                <p style={{ margin: 0 }}>{ev.description}</p>
              </div>
              <div style={{ flex: 'none', borderLeft: '1px solid var(--border)', paddingLeft: '24px', width: '200px' }}>
                <div className="ev-prize" style={{ marginBottom: '12px' }}>{ev.prizePool}</div>
                <button className={ev.status === 'active' ? 'btn-primary' : 'btn-outline'} style={{ width: '100%' }}>
                  {ev.status === 'active' ? 'Register →' : ev.status === 'upcoming' ? 'Pre-register' : 'See Results'}
                </button>
              </div>
            </div>
          </Link>
        </HoverCard>
      )
    }

    return (
      <HoverCard key={ev.id}>
        <Link to={`/events/${ev.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={`event-card ${ev.status === 'active' ? 'active-ev' : ev.status}`} style={isRecommended ? { borderColor: 'rgba(34,211,238,0.35)' } : {}}>
            {isRecommended && <div style={{ fontSize: '11px', color: 'var(--accent3)', fontWeight: 600, marginBottom: '8px' }}>⭐ AI Recommended for You</div>}
            <div className={`ev-badge ${badgeClass}`}><span className="bdot"></span> {badgeText}</div>
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
            <div className="ev-meta">
              <span>📅 {ev.dateStr}</span>
              <span>👥 {ev.participants} registered</span>
              <span>🌍 {ev.status === 'upcoming' ? 'Remote Only' : 'Global + Remote'}</span>
            </div>
            <div className="ev-footer">
              <div className="ev-prize">{ev.prizePool}</div>
              <button className={ev.status === 'active' ? 'btn-primary' : 'btn-outline'} style={{ fontSize: '12px', padding: '6px 14px' }}>
                {ev.status === 'active' ? 'Register →' : ev.status === 'upcoming' ? 'Pre-register' : 'See Results'}
              </button>
            </div>
          </div>
        </Link>
      </HoverCard>
    )
  }

  return (
    <FadeIn>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="listing-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', padding: '2rem 0', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-1px' }}>Hackathons</h1>
            <div style={{ color: 'var(--text2)', fontSize: '15px' }}>Find your next builder challenge.</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="search-bar" style={{ width: '300px', background: 'var(--bg2)' }}>
              <span>🔍</span>
              <input type="text" placeholder="Search events..." />
            </div>
            <div style={{ display: 'flex', background: 'var(--bg2)', borderRadius: '10px', padding: '4px', border: '1px solid var(--border)' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: viewMode === 'grid' ? 'rgba(108, 99, 255, 0.15)' : 'transparent', color: viewMode === 'grid' ? 'var(--text)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500, fontSize: '13px' }}
              >
                ⊞ Grid
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: viewMode === 'list' ? 'rgba(108, 99, 255, 0.15)' : 'transparent', color: viewMode === 'list' ? 'var(--text)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500, fontSize: '13px' }}
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', paddingBottom: '4rem' }}>
          {/* New E-Commerce Style Sidebar */}
          <div style={{ width: '240px', flexShrink: 0, position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            
            <div>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text3)', marginBottom: '1rem', fontWeight: 700 }}>Status</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['All', 'Active', 'Upcoming', 'Closed'].map(f => {
                  const labelMap: Record<string, string> = {
                    All: 'All Statuses',
                    Active: '🟢 Active',
                    Upcoming: '🔵 Upcoming',
                    Closed: '⚫ Closed'
                  };
                  return (
                    <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }} className="hover-trigger">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={activeFilter === f || (activeFilter.includes(f) && f !== 'All') || (f === 'All' && activeFilter === 'All')} 
                        onChange={() => setActiveFilter(f)} 
                        style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                      />
                      <span style={{ color: activeFilter === f || (f === 'All' && activeFilter === 'All') ? 'var(--text)' : 'var(--text2)', fontWeight: activeFilter === f || (f === 'All' && activeFilter === 'All') ? 600 : 400 }}>{labelMap[f]}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div style={{ height: '1px', background: 'var(--border)' }}></div>

            <div>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text3)', marginBottom: '1rem', fontWeight: 700 }}>Tracks</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['AI / ML', 'Web3', 'Open Track', 'DevOps'].map(f => (
                  <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }} className="hover-trigger">
                    <input 
                      type="checkbox" 
                      checked={activeFilter.includes(f)} 
                      onChange={() => setActiveFilter(f)} 
                      style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                    />
                    <span style={{ color: activeFilter.includes(f) ? 'var(--text)' : 'var(--text2)', fontWeight: activeFilter.includes(f) ? 600 : 400 }}>{f}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-sec)' }}>Loading events...</div>
            ) : (
              <StaggeredList 
                className={viewMode === 'grid' ? 'events-grid' : ''} 
                style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '1.25rem' } : { padding: 0 }}
              >
                {filteredEvents.map(renderEventCard)}
              </StaggeredList>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
