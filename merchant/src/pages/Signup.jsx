import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function Signup(){
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    try{
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Signup failed')
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="login-page">
      <header className="dash-header login-header" style={{backdropFilter: 'blur(6px)'}}>
        <div className="header-left">
          <button className="icon-btn" onClick={()=>{}}>☰</button>
          <div className="brand">{t('merchantDashboard')}</div>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <button className="icon" onClick={toggleTheme} title="Toggle theme">{isDark ? '🌙' : '☀️'}</button>
            <div className="icon profile" style={{position:'relative'}}>
              <Link to="/" style={{textDecoration:'none',color:'inherit'}}>🏠</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="auth-root login-auth-root">
        <div className="auth-card">
          <div className="auth-card-inner">
            <h2>{t('signUp')}</h2>
            <p className="muted">Create an account to manage your fleet</p>
            <form onSubmit={handleSubmit} className="auth-form">
              <label>
                {t('username')}
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder={t('username').toLowerCase()} required />
              </label>
              <label>
                {t('password')}
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
              </label>
              {error && <div className="form-error">{error}</div>}
              <div className="auth-actions">
                <button type="submit" className="btn btn-primary">{t('signUp')}</button>
              </div>
            </form>
            <div style={{marginTop:12}}>
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
