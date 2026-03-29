import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import './home.css'

function ThemeButton(){
  const { isDark, toggleTheme } = useTheme()
  return (
    <button className="icon" onClick={toggleTheme} title="Toggle theme">{isDark ? '🌙' : '☀️'}</button>
  )
}

function SettingsButton(){
  const [open, setOpen] = useState(false)
  const enabled = typeof window !== 'undefined' ? (localStorage.getItem('showParticles') !== 'false') : true

  function toggleParticles(){
    try{
      const next = !(localStorage.getItem('showParticles') === 'true')
      localStorage.setItem('showParticles', String(next))
      // notify other parts of the app if they listen
      try{ window.dispatchEvent(new CustomEvent('mnms:particles-changed',{detail: next})) }catch(e){}
    }catch(e){}
    setOpen(false)
  }

  return (
    <div className="icon" style={{position: 'relative'}} onClick={e=>{e.stopPropagation(); setOpen(v=>!v)}} aria-haspopup="true" aria-expanded={open}>
      ⚙️
      {open && (
        <div className="settings-menu" onClick={e=>e.stopPropagation()}>
          <div className="profile-name">Settings</div>
          <button className="btn-ghost" onClick={toggleParticles}>
            {enabled ? 'Hide background' : 'Show background'}
          </button>
        </div>
      )}
    </div>
  )
}

function LanguageButton(){
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ]

  const currentLang = languages.find(l => l.code === language) || languages[0]

  function selectLanguage(code){
    setLanguage(code)
    setOpen(false)
  }

  return (
    <div className="icon" style={{position: 'relative'}} onClick={e=>{e.stopPropagation(); setOpen(v=>!v)}} aria-haspopup="true" aria-expanded={open}>
      🌐
      {open && (
        <div className="settings-menu" onClick={e=>e.stopPropagation()}>
          <div className="profile-name">Language</div>
          {languages.map(lang => (
            <button 
              key={lang.code}
              className="btn-ghost" 
              onClick={() => selectLanguage(lang.code)}
              style={{fontWeight: language === lang.code ? '600' : '400'}}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}



export default function Home() {
  const { t } = useLanguage()
  
  return (
    <div className="home-root">
      <header className="dash-header" style={{backdropFilter: 'blur(6px)'}}>
        <div className="header-left">
          <button className="icon-btn" onClick={()=>{}}>☰</button>
          <div className="brand">{t('merchantDashboard')}</div>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <LanguageButton />
            <SettingsButton />
            <ThemeButton />
            <div className="icon profile" style={{position:'relative'}}>
              <Link to="/login" style={{textDecoration:'none',color:'inherit'}}>👤</Link>
            </div>
          </div>
        </div>
      </header>

      <header className="hero modern-hero">
        <div className="hero-inner grid">
          <div className="hero-copy">
            <div className="hero-large-loop">
              <span className="loop-text">{t('heroText')}</span>
            </div>
            <div style={{marginTop:18}} className="hero-actions">
              <Link to="/login" className="btn btn-primary">{t('getStarted')}</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="features modern-features">
        <div className="feature">
          <div className="icon">⛴️</div>
          <h3>{t('shipManagement')}</h3>
          <p>{t('shipManagementDesc')}</p>
        </div>
        <div className="feature">
          <div className="icon">⚓</div>
          <h3>{t('portManagement')}</h3>
          <p>{t('portManagementDesc')}</p>
        </div>
        <div className="feature">
          <div className="icon">🧭</div>
          <h3>{t('voyagePlanning')}</h3>
          <p>{t('voyagePlanningDesc')}</p>
        </div>
        <div className="feature">
          <div className="icon">📦</div>
          <h3>{t('cargoTracking')}</h3>
          <p>{t('cargoTrackingDesc')}</p>
        </div>
        <div className="feature">
          <div className="icon">👨‍✈️</div>
          <h3>{t('crewRoster')}</h3>
          <p>{t('crewRosterDesc')}</p>
        </div>
      </section>

      <footer className="site-footer">
        <small>{t('footer')}</small>
      </footer>
    </div>
  )
}
