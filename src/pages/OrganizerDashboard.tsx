import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FadeIn, StaggeredList, HoverCard } from '@/components/ui/animations'
import { motion } from 'framer-motion'

const COLORS = ['#22d3ee', '#c084fc', '#818cf8', '#f472b6']

export function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const dataLine = [
    { name: 'Mon', regs: 120 }, { name: 'Tue', regs: 250 }, { name: 'Wed', regs: 380 },
    { name: 'Thu', regs: 510 }, { name: 'Fri', regs: 840 }, { name: 'Sat', regs: 1100 },
    { name: 'Sun', regs: 1240 },
  ]

  const dataPie = [
    { name: 'AI / ML', value: 45 }, { name: 'Web3', value: 25 }, 
    { name: 'Open', value: 20 }, { name: 'DevOps', value: 10 },
  ]

  // Mock table data
  const users = [
    { id: 'USR-9021', name: 'Alex Chen', team: 'NullPointers', track: 'AI/ML', status: 'Submitted', date: 'Aug 14, 10:22 AM' },
    { id: 'USR-9022', name: 'Sarah Jenkins', team: 'BlockBuilders', track: 'Web3', status: 'In Progress', date: 'Aug 14, 09:15 AM' },
    { id: 'USR-9023', name: 'Miguel Rossi', team: 'DataPunks', track: 'Open', status: 'Registered', date: 'Aug 13, 04:45 PM' },
    { id: 'USR-9024', name: 'Yuki Tanaka', team: 'NullPointers', track: 'AI/ML', status: 'Submitted', date: 'Aug 13, 11:30 AM' },
    { id: 'USR-9025', name: 'Priya Sharma', team: 'CloudNative', track: 'DevOps', status: 'In Progress', date: 'Aug 12, 02:20 PM' },
    { id: 'USR-9026', name: 'James Wilson', team: 'AlphaCode', track: 'AI/ML', status: 'Registered', date: 'Aug 12, 09:00 AM' },
  ]

  const [logs, setLogs] = useState([
    { t: '10:24:33', msg: 'New team [NullPointers] created' },
    { t: '10:24:01', msg: 'System backup completed' },
    { t: '10:22:15', msg: 'User login: arjun@null.com' },
  ])

  useEffect(() => {
    const iv = setInterval(() => {
      setLogs(prev => {
        const msgs = ['API rate limit approaching', 'New project submitted (ID: 9412)', 'GitHub webhook received', 'Discord notification sent']
        const newLog = { t: new Date().toLocaleTimeString(), msg: msgs[Math.floor(Math.random() * msgs.length)] }
        return [newLog, ...prev].slice(0, 5)
      })
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  return (
    <FadeIn className="dash-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: '0.25rem' }}>COMMAND CENTER</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Organizer Portal</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>Export CSV</button>
          <button className="btn-primary">Broadcast Message</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
        <button 
          onClick={() => setActiveTab('overview')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--text)' : 'var(--text-sec)', padding: '8px 16px', cursor: 'pointer', borderBottom: activeTab === 'overview' ? '2px solid var(--accent)' : '2px solid transparent', fontWeight: 600 }}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'users' ? 'var(--text)' : 'var(--text-sec)', padding: '8px 16px', cursor: 'pointer', borderBottom: activeTab === 'users' ? '2px solid var(--accent)' : '2px solid transparent', fontWeight: 600 }}
        >
          Users & Teams
        </button>
        <button 
          onClick={() => setActiveTab('judging')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'judging' ? 'var(--text)' : 'var(--text-sec)', padding: '8px 16px', cursor: 'pointer', borderBottom: activeTab === 'judging' ? '2px solid var(--accent)' : '2px solid transparent', fontWeight: 600 }}
        >
          Judging Progress
        </button>
      </div>

      {activeTab === 'overview' && (
        <StaggeredList>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '2rem' }}>
            <HoverCard className="dash-card">
              <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase' }}>Total Users</div>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>1,240</div>
              <div style={{ fontSize: '12px', color: 'var(--green)' }}>+14% since yesterday</div>
            </HoverCard>
            <HoverCard className="dash-card">
              <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase' }}>Teams Formed</div>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>315</div>
              <div style={{ fontSize: '12px', color: 'var(--green)' }}>+8% since yesterday</div>
            </HoverCard>
            <HoverCard className="dash-card">
              <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase' }}>Submissions</div>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>42</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Deadline in 14 days</div>
            </HoverCard>
            <HoverCard className="dash-card">
              <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase' }}>System Load</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>24%</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>All systems operational</div>
            </HoverCard>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Charts Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <HoverCard className="dash-card">
                <h3 style={{ marginBottom: '1rem' }}>Registration Velocity</h3>
                <div style={{ height: '300px', width: '100%' }}>
                  <ResponsiveContainer>
                    <LineChart data={dataLine} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="name" stroke="var(--text3)" tick={{fill: 'var(--text3)'}} axisLine={false} tickLine={false} />
                      <YAxis stroke="var(--text3)" tick={{fill: 'var(--text3)'}} axisLine={false} tickLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="regs" stroke="var(--accent)" strokeWidth={3} dot={{r: 4, fill: 'var(--bg)', strokeWidth: 2}} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </HoverCard>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <HoverCard className="dash-card">
                <h3 style={{ marginBottom: '1rem' }}>Track Distribution</h3>
                <div style={{ height: '200px', width: '100%' }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={dataPie} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {dataPie.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '1rem' }}>
                  {dataPie.map((d, i) => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: COLORS[i] }}></span>
                      <span style={{ color: 'var(--text-sec)' }}>{d.name}</span>
                    </div>
                  ))}
                </div>
              </HoverCard>

              <HoverCard className="dash-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>System Logs</h3>
                  <div style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                </div>
                <div className="terminal-logs" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '8px', flex: 1, fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text2)', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {logs.map((l, i) => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i + l.t} style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ color: 'var(--text3)' }}>[{l.t}]</span>
                      <span style={{ color: l.msg.toLowerCase().includes('error') || l.msg.toLowerCase().includes('limit') ? 'var(--red)' : 'var(--text)' }}>{l.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </HoverCard>
            </div>
          </div>
        </StaggeredList>
      )}

      {activeTab === 'users' && (
        <FadeIn>
          <HoverCard className="dash-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="search-bar" style={{ width: '300px', background: 'var(--bg)' }}>
                <span>🔍</span>
                <input type="text" placeholder="Search users or teams..." />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select className="form-input" style={{ width: 'auto', padding: '8px 12px' }}>
                  <option>All Tracks</option>
                  <option>AI / ML</option>
                  <option>Web3</option>
                </select>
                <select className="form-input" style={{ width: 'auto', padding: '8px 12px' }}>
                  <option>Status: All</option>
                  <option>Status: Submitted</option>
                </select>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg2)', color: 'var(--text3)' }}>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>User ID</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Participant Name</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Team</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Track</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Joined</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, borderBottom: '1px solid var(--border)' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom: i === users.length - 1 ? 'none' : '1px solid var(--border)', background: 'var(--bg)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-sec)' }}>{u.id}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{u.name}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{u.team}</td>
                      <td style={{ padding: '1rem 1.5rem' }}><span style={{ padding: '4px 8px', background: 'var(--bg2)', borderRadius: '4px', fontSize: '12px' }}>{u.track}</span></td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: u.status === 'Submitted' ? 'var(--green)' : u.status === 'In Progress' ? 'var(--accent)' : 'var(--text3)' }}></span>
                          {u.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-sec)', fontSize: '13px' }}>{u.date}</td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-sec)', cursor: 'pointer', padding: '4px' }}>⋮</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--text-sec)' }}>
              <div>Showing 1 to 6 of 1,240 entries</div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button className="btn-outline" style={{ padding: '4px 10px' }} disabled>Previous</button>
                <button className="btn-outline" style={{ padding: '4px 10px', background: 'var(--accent)', color: 'black', borderColor: 'var(--accent)' }}>1</button>
                <button className="btn-outline" style={{ padding: '4px 10px' }}>2</button>
                <button className="btn-outline" style={{ padding: '4px 10px' }}>3</button>
                <span>...</span>
                <button className="btn-outline" style={{ padding: '4px 10px' }}>Next</button>
              </div>
            </div>
          </HoverCard>
        </FadeIn>
      )}

      {activeTab === 'judging' && (
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            
            {/* Left Column: Projects & Reviews Status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <HoverCard className="dash-card">
                <h3>Overall Review Progress</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1, height: '10px', background: 'var(--bg3)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '42%', height: '100%', background: 'var(--accent)', borderRadius: '10px' }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--mono)' }}>42.8%</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text2)' }}>18 out of 42 submissions have been fully evaluated by all 3 assigned judges.</div>
              </HoverCard>

              <HoverCard className="dash-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Submission Queue & Scores</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { id: 'SUB-102', name: 'NeuralSearch API', track: 'AI / ML', score: '88.2', reviews: '3/3' },
                    { id: 'SUB-105', name: 'DeFi Auto-Swap', track: 'Web3', score: '84.5', reviews: '3/3' },
                    { id: 'SUB-109', name: 'SecureVault Auth', track: 'Open Track', score: 'Pending', reviews: '2/3' },
                    { id: 'SUB-112', name: 'KubeDeploy Helper', track: 'DevOps', score: 'Pending', reviews: '1/3' },
                    { id: 'SUB-115', name: 'SaaS Builder Agent', track: 'AI / ML', score: 'Pending', reviews: '0/3' },
                  ].map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>{p.name}</span>
                          <span style={{ fontSize: '10px', background: 'var(--bg3)', color: 'var(--text3)', padding: '2px 6px', borderRadius: '4px' }}>{p.track}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--mono)', marginTop: '4px' }}>ID: {p.id}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase' }}>Reviews</div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: p.reviews === '3/3' ? 'var(--green)' : 'var(--accent)' }}>{p.reviews}</div>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '60px' }}>
                          <div style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase' }}>Avg Score</div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: p.score === 'Pending' ? 'var(--text3)' : 'var(--accent)' }}>{p.score}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </HoverCard>

            </div>

            {/* Right Column: Active Judges */}
            <div>
              <HoverCard className="dash-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Active Judges Progress</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { name: 'Dr. Priya Sharma', role: 'AI / ML Specialist', progress: '12/15' },
                    { name: 'Dr. Amit Patel', role: 'Web3 Architect', progress: '10/12' },
                    { name: 'Sarah Connor', role: 'DevOps Engineer', progress: '6/12' },
                    { name: 'Markus Vance', role: 'Product Lead', progress: '2/10' },
                  ].map((j) => (
                    <div key={j.name} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600 }}>{j.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>{j.role}</div>
                        </div>
                        <span style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--text2)', fontWeight: 600 }}>{j.progress}</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'var(--bg3)', borderRadius: '10px', marginTop: '8px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${(parseInt(j.progress.split('/')[0]) / parseInt(j.progress.split('/')[1])) * 100}%`, 
                          height: '100%', 
                          background: 'var(--accent)', 
                          borderRadius: '10px' 
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-outline" style={{ width: '100%', marginTop: '1.5rem', fontSize: '13px' }}>Manage Assignments</button>
              </HoverCard>
            </div>

          </div>
        </FadeIn>
      )}

    </FadeIn>
  )
}
