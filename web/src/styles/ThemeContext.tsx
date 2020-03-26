/** @jsx jsx */
import { jsx } from '@emotion/core'
import { createContext, useState, useContext, useRef, useEffect } from 'react'

type Theme = 'light' | 'dark'
type SetTheme = (theme: Theme) => void

const ThemeContext = createContext<Theme>(null!)
const SetThemeContext = createContext<SetTheme>(null!)

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const bodyEl = useRef(document.querySelector('body')!).current

  useEffect(() => {
    bodyEl.classList.add(theme)
    return () => bodyEl.classList.remove(theme)
  }, [bodyEl, theme])

  return (
    <ThemeContext.Provider value={theme}>
      <SetThemeContext.Provider value={setTheme}>
        {children}
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export const useSetTheme = () => useContext(SetThemeContext)
