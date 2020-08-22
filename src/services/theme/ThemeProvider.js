import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../utils/colorUtils'

export default function ThemeProvider({children}) {
  const { selectedTheme } = useSelector(state => state.theme)
  const themes = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
}
  return (
    <StyledThemeProvider theme={themes[selectedTheme]}>
      {children}
    </StyledThemeProvider>
  )
}