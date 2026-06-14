import { FadeIn, StaggeredList, HoverCard } from '@/components/ui/animations'

const pastProjects = [
  { id: 1, title: 'NeuralSearch API', team: 'NullPointers', track: 'AI / ML', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400', desc: 'Vector database semantic search layer with 5ms latency.' },
  { id: 2, title: 'ZK-Rollup Dex', team: 'BlockBuilders', track: 'Web3', image: 'https://images.unsplash.com/photo-1639762681485-074b7f4f4314?auto=format&fit=crop&q=80&w=400', desc: 'Zero-knowledge proofs for gasless decentralized trading.' },
  { id: 3, title: 'HealthSync', team: 'DataPunks', track: 'Open Track', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400', desc: 'HL7 compliant medical record synchronization protocol.' },
  { id: 4, title: 'Agentic Workflow', team: 'AlphaNeural', track: 'AI / ML', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400', desc: 'Autonomous LLM agents that write and deploy microservices.' },
  { id: 5, title: 'DAO Governance', team: 'ChainLinkers', track: 'Web3', image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=400', desc: 'On-chain voting with quadratic funding mechanisms.' },
  { id: 6, title: 'EcoTrack', team: 'GreenCode', track: 'Open Track', image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=400', desc: 'IoT carbon footprint tracking for enterprise logistics.' },
]

export function ShowcaseGallery() {
  return (
    <FadeIn>
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '6rem 0 2rem', background: 'transparent' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, var(--text), var(--text2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, letterSpacing: '-1.5px' }}>
          Hall of Fame
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text2)', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem' }}>
          Explore the winning projects from past BeetleX Hackathons. Discover what it takes to build the future.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        <StaggeredList style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {pastProjects.map((p) => (
            <HoverCard key={p.id} className="dash-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={p.image} 
                  alt={p.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} 
                  onError={(e) => {
                    // Fallback to stock unsplash image if specific path fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600';
                  }}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px', marginBottom: '8px' }}>{p.track.toUpperCase()}</div>
                <h3 style={{ marginBottom: '4px', fontWeight: 700 }}>{p.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '12px' }}>By {p.team}</div>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.5 }}>{p.desc}</p>
                <button className="btn-outline" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
              </div>
            </HoverCard>
          ))}
        </StaggeredList>
      </div>
    </FadeIn>
  )
}
