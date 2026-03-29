import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    merchantDashboard: 'Merchant Dashboard',
    
    heroText: 'Manage ships, ports and voyages from a single control center.',
    getStarted: 'Get started',
    exploreDemo: 'Explore demo',
    
    shipManagement: 'Ship Management',
    shipManagementDesc: 'Track ships, status, capacity and maintenance schedules.',
    portManagement: 'Port Management',
    portManagementDesc: 'Manage ports, berths and arrival/departure operations.',
    voyagePlanning: 'Voyage Planning',
    voyagePlanningDesc: 'Plan routes, ETAs and monitor voyage progress in real time.',
    cargoTracking: 'Cargo Tracking',
    cargoTrackingDesc: 'Manage manifests, statuses and cargo documentation.',
    crewRoster: 'Crew Roster',
    crewRosterDesc: 'Manage crew, certifications, and assignments with ease.',
    
   
    signIn: 'Sign in',
    loginSubtitle: 'Use your username to access the Merchant Dashboard',
    username: 'Username',
    password: 'Password',
    logIn: 'Log in',
    
    ships: 'Ships',
    ports: 'Ports',
    voyages: 'Voyages',
    cargo: 'Cargo',
    crew: 'Crew',
    settings: 'Settings',
    hideBackground: 'Hide background',
    showBackground: 'Show background',
    signedIn: 'Signed in',
    logout: 'Logout',
    language: 'Language',
    
    footer: '© Merchant Navy Management by samith and sayeesh'
  },
  hi: {
    merchantDashboard: 'मर्चेंट डैशबोर्ड',
    
    heroText: 'एक ही नियंत्रण केंद्र से जहाजों, बंदरगाहों और यात्राओं का प्रबंधन करें।',
    getStarted: 'शुरू करें',
    exploreDemo: 'डेमो देखें',
    
    shipManagement: 'जहाज प्रबंधन',
    shipManagementDesc: 'जहाजों, स्थिति, क्षमता और रखरखाव अनुसूची को ट्रैक करें।',
    portManagement: 'बंदरगाह प्रबंधन',
    portManagementDesc: 'बंदरगाहों, घाटों और आगमन/प्रस्थान संचालन का प्रबंधन करें।',
    voyagePlanning: 'यात्रा योजना',
    voyagePlanningDesc: 'मार्गों, ईटीए की योजना बनाएं और वास्तविक समय में यात्रा की प्रगति की निगरानी करें।',
    cargoTracking: 'कार्गो ट्रैकिंग',
    cargoTrackingDesc: 'मैनिफेस्ट, स्थिति और कार्गो दस्तावेज़ीकरण का प्रबंधन करें।',
    crewRoster: 'चालक दल सूची',
    crewRosterDesc: 'चालक दल, प्रमाणपत्र और असाइनमेंट को आसानी से प्रबंधित करें।',
    
    signIn: 'साइन इन करें',
    loginSubtitle: 'मर्चेंट डैशबोर्ड तक पहुंचने के लिए अपना उपयोगकर्ता नाम उपयोग करें',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    logIn: 'लॉग इन करें',
    
    ships: 'जहाज',
    ports: 'बंदरगाह',
    voyages: 'यात्राएं',
    cargo: 'कार्गो',
    crew: 'चालक दल',
    settings: 'सेटिंग्स',
    hideBackground: 'पृष्ठभूमि छुपाएं',
    showBackground: 'पृष्ठभूमि दिखाएं',
    signedIn: 'साइन इन किया हुआ',
    logout: 'लॉगआउट',
    language: 'भाषा',
    
    footer: '© मर्चेंट नेवी प्रबंधन '
  },
  kn: {
    merchantDashboard: 'ಮರ್ಚೆಂಟ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    
    heroText: 'ಒಂದೇ ನಿಯಂತ್ರಣ ಕೇಂದ್ರದಿಂದ ಹಡಗುಗಳು, ಬಂದರುಗಳು ಮತ್ತು ಪ್ರಯಾಣಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    exploreDemo: 'ಡೆಮೊವನ್ನು ಅನ್ವೇಷಿಸಿ',
    
    shipManagement: 'ಹಡಗು ನಿರ್ವಹಣೆ',
    shipManagementDesc: 'ಹಡಗುಗಳು, ಸ್ಥಿತಿ, ಸಾಮರ್ಥ್ಯ ಮತ್ತು ನಿರ್ವಹಣಾ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    portManagement: 'ಬಂದರು ನಿರ್ವಹಣೆ',
    portManagementDesc: 'ಬಂದರುಗಳು, ಬರ್ತ್‌ಗಳು ಮತ್ತು ಆಗಮನ/ನಿರ್ಗಮನ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
    voyagePlanning: 'ಪ್ರಯಾಣ ಯೋಜನೆ',
    voyagePlanningDesc: 'ಮಾರ್ಗಗಳು, ETAಗಳನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ನೈಜ ಸಮಯದಲ್ಲಿ ಪ್ರಯಾಣದ ಪ್ರಗತಿಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
    cargoTracking: 'ಕಾರ್ಗೋ ಟ್ರ್ಯಾಕಿಂಗ್',
    cargoTrackingDesc: 'ಮ್ಯಾನಿಫೆಸ್ಟ್‌ಗಳು, ಸ್ಥಿತಿಗಳು ಮತ್ತು ಕಾರ್ಗೋ ದಾಖಲಾತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
    crewRoster: 'ಸಿಬ್ಬಂದಿ ಪಟ್ಟಿ',
    crewRosterDesc: 'ಸಿಬ್ಬಂದಿ, ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ನಿಯೋಜನೆಗಳನ್ನು ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸಿ.',
    
    // Login
    signIn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    loginSubtitle: 'ಮರ್ಚೆಂಟ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ಬಳಕೆದಾರಹೆಸರನ್ನು ಬಳಸಿ',
    username: 'ಬಳಕೆದಾರಹೆಸರು',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    logIn: 'ಲಾಗ್ ಇನ್ ಮಾಡಿ',
    
    // Dashboard
    ships: 'ಹಡಗುಗಳು',
    ports: 'ಬಂದರುಗಳು',
    voyages: 'ಪ್ರಯಾಣಗಳು',
    cargo: 'ಕಾರ್ಗೋ',
    crew: 'ಸಿಬ್ಬಂದಿ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    hideBackground: 'ಹಿನ್ನೆಲೆ ಮರೆಮಾಡಿ',
    showBackground: 'ಹಿನ್ನೆಲೆ ತೋರಿಸಿ',
    signedIn: 'ಸೈನ್ ಇನ್ ಆಗಿದೆ',
    logout: 'ಲಾಗ್ ಔಟ್',
    language: 'ಭಾಷೆ',
    
    // Footer
    footer: '© ಮರ್ಚೆಂಟ್ ನೇವಿ ನಿರ್ವಹಣೆ '
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
