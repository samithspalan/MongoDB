import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import './home.css'

function Icon({ name, className = '', strokeWidth = 1.9 }) {
  const base = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true'
  }

  const icons = {
    menu: <path d="M4 7h16M4 12h12M4 17h16" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.1 1.1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1.1-1.1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.6a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4L6 4.8a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.6a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1 1 0 0 1 1 1v1.6a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6z" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" /></>,
    moon: <path d="M20.4 14.3A8.3 8.3 0 1 1 9.7 3.6a7 7 0 1 0 10.7 10.7z" />,
    user: <><circle cx="12" cy="8" r="3.2" /><path d="M5 19a7 7 0 0 1 14 0" /></>,
    ship: <><path d="M3 15.5 12 6l9 9.5M4.5 18.2l7.5 2.8 7.5-2.8" /><path d="M3 13h18" /></>,
    anchor: <><path d="M12 3v13M7 11h10" /><path d="M6 14a6 6 0 0 0 12 0" /><circle cx="12" cy="4" r="1.2" /></>,
    compass: <><circle cx="12" cy="12" r="8.5" /><path d="m10 10 4-1-1 4-4 1 1-4z" /></>,
    box: <><path d="m3.5 8 8.5-4 8.5 4-8.5 4z" /><path d="M3.5 8v8l8.5 4 8.5-4V8" /><path d="M12 12v8" /></>,
    crew: <><circle cx="8" cy="9" r="2" /><circle cx="16" cy="9" r="2" /><path d="M4.5 18a3.5 3.5 0 0 1 7 0M12.5 18a3.5 3.5 0 0 1 7 0" /></>
  }

  return (
    <svg className={className} {...base}>
      {icons[name] || icons.settings}
    </svg>
  )
}

function ThemeButton(){
  const { isDark, toggleTheme } = useTheme()
  return (
    <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">{isDark ? '🌙' : '☀️'}</button>
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

  const featureCards = [
    { icon: 'ship', title: t('shipManagement'), desc: t('shipManagementDesc') },
    { icon: 'anchor', title: t('portManagement'), desc: t('portManagementDesc') },
    { icon: 'compass', title: t('voyagePlanning'), desc: t('voyagePlanningDesc') },
    { icon: 'box', title: t('cargoTracking'), desc: t('cargoTrackingDesc') },
    { icon: 'crew', title: t('crewRoster'), desc: t('crewRosterDesc') },
    { icon: 'globe', title: 'Global Network', desc: 'Real-time positioning and jurisdictional tracking across international waters.' },
  ]

  const stats = [
    { label: 'Active Routes', value: '24+' },
    { label: 'Ports Connected', value: '18' },
    { label: 'Cargo Accuracy', value: '99.2%' },
    { label: 'Crew On Duty', value: '126' },
  ]

  const ops = [
    { title: 'Inbound Voyages', value: '07', detail: 'On schedule' },
    { title: 'Cargo Clearance', value: '94%', detail: 'Processing' },
    { title: 'Port Alerts', value: '03', detail: 'Action required' },
  ]

  return (
    <div className="home-root">
      <div className="home-backdrop" aria-hidden="true">
        <span className="home-glow glow-a" />
        <span className="home-glow glow-b" />
        <div className="home-grid" />
      </div>

      <header className="dash-header">
        <div className="header-left">
          <button className="icon-btn">☰</button>
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

      <main className="home-main">
        <section className="hero-shell">
          <div className="hero-left">
          
            <h1 className="hero-title">
              <span>Next-Gen</span>
              <em>Maritime Control.</em>
            </h1>
            <p className="hero-subtext">
              Harness real-time data to orchestrate global logistics. A unified command interface for the modern merchant fleet.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">Launch Command</Link>
              <a href="#features" className="btn btn-ghost hero-secondary">Explore Platform</a>
            </div>
          </div>

          <aside className="hero-right">
            <article className="ops-panel">
              <div className="ops-header">
                <h2>Live Fleet Status</h2>
                <span className="status-badge">Live</span>
              </div>
              {ops.map((item, idx) => (
                <div key={item.title} className="ops-row">
                  <div className="ops-info">
                    <p>{item.title}</p>
                    <small>{item.detail}</small>
                  </div>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </article>
          </aside>
        </section>

        <section className="metrics-grid">
          {stats.map((item, idx) => (
            <article key={item.label} className="metric-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>

        <section id="features" className="features-grid">
          {featureCards.map((card, idx) => (
            <article key={card.title} className="feature-card">
              <div className="feature-icon"><Icon name={card.icon} className="card-icon" /></div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <small>{t('footer')}</small>
          <div className="footer-links">
            <span>Privacy</span>
            <span>Security</span>
            <span>API Docs</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
