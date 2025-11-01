import { createTheme as createMuiTheme, Theme } from '@mui/material/styles'

import typography from './typography'
import paletteBase from './palette-base'
import paletteLight from './palette-light'
import paletteDark from './palette-dark'
import shadows from './shadows'

// default
const createTheme = (darkMode?: boolean): Theme => {
  const palette = darkMode ? { ...paletteBase, ...paletteDark } : { ...paletteBase, ...paletteLight }
  return createMuiTheme({
    palette,
    typography,
    shadows,
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            maxWidth: '100%',
            height: 'auto',
          },
        },
      },
    },
  })
}

const theme = createTheme(false)

export { paletteBase, paletteLight, paletteDark, typography, shadows, createTheme }
export default theme
