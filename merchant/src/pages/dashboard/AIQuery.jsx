import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function AIQuery() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function handleSearch(e) {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch(`${API_BASE}/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Query failed')
      
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-root ai-query-page">
      <div className="ai-query-header">
        <div className="ai-badge">
          <span>✨ AI POWERED</span>
        </div>
        <h1>AI Query Explorer</h1>
        <p className="muted">Ask questions about your fleet in plain English. For example: "Show all container ships" or "Find crew with rank Captain".</p>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="What would you like to know about the merchant navy?" 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={loading}
              className="ai-input"
            />
            <button type="submit" className="ai-send-btn" disabled={loading || !prompt.trim()}>
              {loading ? <div className="spinner" /> : <span>🚀</span>}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="ai-error-card">
          <span>ℹ️ {error}</span>
        </div>
      )}

      {data && (
        <div className="ai-results-container">
          <div className="ai-interpretation">
            <div className="interpretation-label">AI INTERPRETATION</div>
            <div className="interpretation-details">
              Querying <strong>{data.interpretation.collection}</strong> 
              {Object.keys(data.interpretation.filter).length > 0 && (
                <> with filter: <code>{JSON.stringify(data.interpretation.filter)}</code></>
              )}
            </div>
            <div className="interpretation-message">{data.message}</div>
          </div>

          {data.results && data.results.length > 0 ? (
            <div className="results-table-wrapper">
              <table className="ai-table">
                <thead>
                  <tr>
                    {Object.keys(data.results[0]).filter(k => k !== '_id').map(key => (
                      <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((row, i) => (
                    <tr key={i}>
                      {Object.keys(row).filter(k => k !== '_id').map(key => (
                        <td key={key}>{String(row[key])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-results">
              <span style={{fontSize: '48px', opacity: 0.2}}>📊</span>
              <p>No records found matching your request.</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .ai-query-page {
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 4rem;
        }

        .ai-query-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(90deg, #7c3aed, #06b6d4);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .ai-query-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(90deg, var(--text), var(--muted));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .search-container {
          margin-bottom: 3rem;
          position: sticky;
          top: 80px;
          z-index: 10;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--card);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 0.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-input-wrapper:focus-within {
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
          transform: translateY(-2px);
        }

        .ai-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 1rem 1.5rem;
          font-size: 1.1rem;
          color: var(--text);
          outline: none;
        }

        .ai-send-btn {
          background: var(--accent);
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ai-send-btn:hover:not(:disabled) {
          background: #6d28d9;
          transform: scale(1.05);
        }

        .ai-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ai-interpretation {
          background: var(--accent-alpha);
          border-left: 4px solid var(--accent);
          padding: 1.5rem;
          border-radius: 0 12px 12px 0;
          margin-bottom: 2rem;
          animation: slideIn 0.3s ease-out;
        }

        .interpretation-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .interpretation-details {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .interpretation-details code {
          background: rgba(0,0,0,0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .interpretation-message {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .ai-error-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .results-table-wrapper {
          background: var(--card);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .ai-table {
          width: 100%;
          border-collapse: collapse;
        }

        .ai-table th {
          background: rgba(0,0,0,0.02);
          text-align: left;
          padding: 1rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 1px solid var(--glass-border);
        }

        .ai-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          font-size: 0.95rem;
        }

        .ai-table tr:last-child td {
          border-bottom: none;
        }

        .empty-results {
          text-align: center;
          padding: 4rem;
          color: var(--muted);
        }

        .muted-icon {
          opacity: 0.2;
          margin-bottom: 1rem;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
