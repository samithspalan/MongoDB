import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import './dashboard.css'

function Header({onToggle, onLogout, onToggleParticles, particlesEnabled}){
  const [scrollY, setScrollY] = useState(0)
  const { isDark, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  useEffect(()=>{
    function onScroll(){
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  const transform = `translateY(${Math.min(scrollY / 30, 8)}px)`

  function onProfileClick(e){
    e.stopPropagation()
    setMenuOpen(v=>!v)
  }

  useEffect(()=>{
    function onDocClick(){ setMenuOpen(false) }
    document.addEventListener('click', onDocClick)
    return ()=> document.removeEventListener('click', onDocClick)
  },[])

  return (
    <header className="dash-header" style={{backdropFilter: 'blur(6px)'}}>
      <div className="header-left">
        <button className="icon-btn" onClick={onToggle} style={{transform}}>
          ☰
        </button>
        <div className="brand">{t('merchantDashboard')}</div>
      </div>
      <div className="header-right">
        <div className="header-icons">
          <div className="icon" style={{transform, position: 'relative'}} onClick={e=>{e.stopPropagation(); setLanguageOpen(v=>!v)}} aria-haspopup="true" aria-expanded={languageOpen}>
            🌐
            {languageOpen && (
              <div className="settings-menu" onClick={e=>e.stopPropagation()}>
                <div className="profile-name">{t('language')}</div>
                <button className="btn-ghost" onClick={()=>{ setLanguage('en'); setLanguageOpen(false) }} style={{fontWeight: language === 'en' ? '600' : '400'}}>
                  🇬🇧 English
                </button>
                <button className="btn-ghost" onClick={()=>{ setLanguage('hi'); setLanguageOpen(false) }} style={{fontWeight: language === 'hi' ? '600' : '400'}}>
                  🇮🇳 हिंदी
                </button>
                <button className="btn-ghost" onClick={()=>{ setLanguage('kn'); setLanguageOpen(false) }} style={{fontWeight: language === 'kn' ? '600' : '400'}}>
                  🇮🇳 ಕನ್ನಡ
                </button>
              </div>
            )}
          </div>
          <div className="icon" style={{transform, position: 'relative'}} onClick={e=>{e.stopPropagation(); setSettingsOpen(v=>!v)}} aria-haspopup="true" aria-expanded={settingsOpen}>
            ⚙️
            {settingsOpen && (
              <div className="settings-menu" onClick={e=>e.stopPropagation()}>
                <div className="profile-name">{t('settings')}</div>
                <button className="btn-ghost" onClick={()=>{ onToggleParticles && onToggleParticles(); setSettingsOpen(false) }}>
                  {particlesEnabled ? t('hideBackground') : t('showBackground')}
                </button>
              </div>
            )}
          </div>
          <button className="icon" onClick={toggleTheme} title="Toggle theme" style={{transform}}>
            {isDark ? '🌙' : '☀️'}
          </button>
          <div className="icon profile" style={{transform, position: 'relative'}} onClick={onProfileClick} aria-haspopup="true" aria-expanded={menuOpen}>
            👤
            {menuOpen && (
              <div className="profile-menu" onClick={e=>e.stopPropagation()}>
                <div className="profile-name">{t('signedIn')}</div>
                <button className="btn-ghost" onClick={onLogout}>{t('logout')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default function DashboardLayout(){
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [showParticles, setShowParticles] = useState(()=>{
    try{ const v = localStorage.getItem('showParticles'); return v === null ? true : v === 'true' }catch(e){ return true }
  })

  useEffect(()=>{
    function onResize(){
      if(window.innerWidth < 900) setOpen(false)
      else setOpen(true)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return ()=> window.removeEventListener('resize', onResize)
  },[])

  useEffect(()=>{
    function onParticlesChanged(e){
      try{ setShowParticles(Boolean(e.detail)) }catch(e){}
    }
    window.addEventListener('mnms:particles-changed', onParticlesChanged)
    return ()=> window.removeEventListener('mnms:particles-changed', onParticlesChanged)
  },[])

  function handleLogout(){
    navigate('/')
  }

  function handleToggleParticles(){
    try{ localStorage.setItem('showParticles', String(!showParticles)) }catch(e){}
    setShowParticles(s => !s)
  }

  return (
    <div className="dash-root">
      {showParticles && <ParticleBackground />}
      <Header onToggle={()=> setOpen(o=>!o)} onLogout={handleLogout} onToggleParticles={handleToggleParticles} particlesEnabled={showParticles} />

      <div className="dash-body">
        <aside className={`dash-sidebar ${open? 'open' : 'closed'}`}>
          <nav>
            <NavLink to="overview" className={({isActive})=> isActive? 'active' : ''}>{t('overview') || 'Overview'}</NavLink>
            <NavLink to="ships" className={({isActive})=> isActive? 'active' : ''}>{t('ships')}</NavLink>
            <NavLink to="ports" className={({isActive})=> isActive? 'active' : ''}>{t('ports')}</NavLink>
            <NavLink to="voyages" className={({isActive})=> isActive? 'active' : ''}>{t('voyages')}</NavLink>
            <NavLink to="cargo" className={({isActive})=> isActive? 'active' : ''}>{t('cargo')}</NavLink>
            <NavLink to="crew" className={({isActive})=> isActive? 'active' : ''}>{t('crew')}</NavLink>
            <NavLink to="ai-query" className={({isActive})=> isActive? 'active' : ''}>AI Query</NavLink>
          </nav>
        </aside>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
