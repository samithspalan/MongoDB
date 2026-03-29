import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Login(){
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="auth-root">
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
  )
}
