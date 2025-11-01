import React, { FC, ReactNode, useMemo } from 'react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@/config/theme'
import { useTheme as useCustomTheme } from '@/contexts/ThemeContext'

interface Props {
  children: ReactNode
}

const MUIProvider: FC<Props> = ({ children }) => {
  const { darkMode } = useCustomTheme();
  
  // Create theme based on dark mode preference
  const theme = useMemo(() => createTheme(darkMode), [darkMode]);
  
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MUIProvider
