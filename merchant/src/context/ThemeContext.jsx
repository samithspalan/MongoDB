import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }){
  const [isDarkMode, setIsDarkMode] = useState(()=>{
    try{
      const saved = localStorage.getItem('mms_theme')
      if(saved) return saved === 'dark'
    }catch(e){}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(()=>{
    try{
      localStorage.setItem('mms_theme', isDarkMode ? 'dark' : 'light')
      document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light'
    }catch(e){}
  },[isDarkMode])

  function toggle(){ setIsDarkMode(d => !d) }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
  const ctx = useContext(ThemeContext)
  if(!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export default ThemeContext
