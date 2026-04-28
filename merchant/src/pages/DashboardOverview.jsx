import { useEffect, useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export default function DashboardOverview(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Make the containing page card/full content use full width for this overview
  useEffect(() => {
    const pageRoot = document.querySelector('.page-root')
    const dashContent = document.querySelector('.dash-content')
    if(pageRoot) pageRoot.classList.add('overview-full')
    if(dashContent) dashContent.classList.add('overview-content')
    return () => {
      if(pageRoot) pageRoot.classList.remove('overview-full')
      if(dashContent) dashContent.classList.remove('overview-content')
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetch(`${API_BASE}/stats/summary`)
      if(!res.ok) throw new Error('Failed to fetch stats')
      const json = await res.json()
      setData(json)
    }catch(err){
      console.error('Stats fetch error:', err)
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  if(loading) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading analytics...</div>
  if(error) return <div style={{padding: '2rem', textAlign: 'center', color: '#dc2626'}}>Error: {error}</div>
  if(!data) return <div style={{padding: '2rem', textAlign: 'center'}}>No data available</div>

  const { summary, crewByRank, shipTypeDistribution, cargoTypeDistribution } = data

  return (
    <div className="page-root overview-full">
      <div className="dashboard-overview">
      {/* Top area: summary cards + crew chart */}
      <div className="top-area">
        <div className="summary-cards-container">
          <div className="summary-card">
            <h3 className="summary-card-label">Total Ships</h3>
            <p className="summary-card-value">{summary.totalShips}</p>
          </div>
          <div className="summary-card">
            <h3 className="summary-card-label">Active Voyages</h3>
            <p className="summary-card-value">{summary.activeVoyages}</p>
          </div>
          <div className="summary-card">
            <h3 className="summary-card-label">Total Cargo Items</h3>
            <p className="summary-card-value">{summary.totalCargoItems}</p>
          </div>
          <div className="summary-card">
            <h3 className="summary-card-label">Total Cargo Weight</h3>
            <p className="summary-card-value">{summary.totalCargoWeight.toLocaleString()} kg</p>
          </div>
        </div>

        <div className="chart-wrapper crew-chart">
          <h3>Crew Distribution by Rank</h3>
          {crewByRank && crewByRank.length > 0 ? (
            <div style={{ flex: 1, width: '100%', minHeight: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={crewByRank}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="rank" angle={-45} textAnchor="end" height={100} stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" name="Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p style={{textAlign: 'center', color: '#6b7280'}}>No crew data available</p>
          )}
        </div>
      </div>

      {/* Bottom area: two pie charts */}
      <div className="bottom-area">
        <div className="chart-wrapper">
          <h3>Ship Types Distribution</h3>
          {shipTypeDistribution && shipTypeDistribution.length > 0 ? (
            <div style={{ flex: 1, width: '100%', minHeight: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipTypeDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    label
                  >
                    {shipTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p style={{textAlign: 'center', color: '#6b7280'}}>No ship data available</p>
          )}
        </div>

        <div className="chart-wrapper">
          <h3>Cargo Types Distribution</h3>
          {cargoTypeDistribution && cargoTypeDistribution.length > 0 ? (
            <div style={{ flex: 1, width: '100%', minHeight: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cargoTypeDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    label
                  >
                    {cargoTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p style={{textAlign: 'center', color: '#6b7280'}}>No cargo data available</p>
          )}
        </div>
      </div>

      <style>{`
        .dashboard-overview {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 3rem;
          min-height: calc(100vh - 120px);
          overflow-y: auto;
          align-items: stretch;
        }

        .top-area {
          display: flex;
          gap: 2rem;
          align-items: stretch;
          width: 100%;
        }

        .summary-cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          min-width: 340px;
          max-width: 420px;
          flex-shrink: 0;
          height: fit-content;
        }

        .summary-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.6rem;
          border-radius: 12px;
          box-shadow: 0 10px 24px rgba(2,6,23,0.06);
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 160px;
        }

        .summary-card:nth-child(2) {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .summary-card:nth-child(3) {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .summary-card:nth-child(4) {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .summary-card-label {
          font-size: 0.9rem;
          font-weight: 700;
          opacity: 0.95;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .summary-card-value {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.05;
        }

        .bottom-area {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2.5rem;
          width: 100%;
        }

        .chart-wrapper {
          background: var(--card, rgba(255, 255, 255, 0.9));
          backdrop-filter: blur(10px);
          border: 1px solid var(--border, rgba(255, 255, 255, 0.2));
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 15px 35px rgba(2, 6, 23, 0.08);
          display: flex;
          flex-direction: column;
          min-height: 480px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .chart-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(2, 6, 23, 0.12);
        }

        .crew-chart {
          flex: 1;
        }

        .chart-wrapper h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.2rem;
          color: var(--text, #111827);
          font-weight: 700;
        }

        .chart-wrapper > div:last-child {
          flex: 1;
          display:flex;
          align-items:center;
          justify-content:center;
          min-height:380px;
        }

        @media (max-width: 1400px) {
          .dashboard-overview {
            padding: 2rem;
          }
          .summary-cards-container {
            max-width: 100%;
            grid-template-columns: repeat(4, 1fr);
            height: auto;
            margin-bottom: 1rem;
          }

          .bottom-area {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 992px) {
          .dashboard-overview {
            padding: 1rem;
          }

          .summary-cards-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
            max-width: 100%;
          }

          .summary-card {
            padding: 1rem;
            min-height: 120px;
          }

          .summary-card-value {
            font-size: 1.6rem;
          }

          .bottom-area {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .chart-wrapper {
            min-height: 420px;
          }
        }
      `}</style>
      </div>
    </div>
  )
}

