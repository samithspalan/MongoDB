import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Login(){
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    navigate('/dashboard')
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
            <h2>{t('signIn')}</h2>
            <p className="muted">{t('loginSubtitle')}</p>
            <form onSubmit={handleSubmit} className="auth-form">
              <label>
                {t('username')}
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder={t('username').toLowerCase()} required />
              </label>
              <label>
                {t('password')}
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
              </label>
              <div className="auth-actions">
                <button type="submit" className="btn btn-primary">{t('logIn')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
