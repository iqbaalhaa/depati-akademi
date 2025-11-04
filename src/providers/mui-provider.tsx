import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@/config/theme'
import { useTheme as useCustomTheme } from '@/contexts/ThemeContext'
import { client } from '@/sanity/lib/client'
import type { SanitySiteSettings } from '@/interfaces/sanity'

interface Props {
  children: ReactNode
}

const MUIProvider = ({ children }: Props) => {
  const { darkMode } = useCustomTheme();
  const [overrides, setOverrides] = useState<{ primaryMain?: string; secondaryMain?: string; accentMain?: string }>()
  
  useEffect(() => {
    client
      .fetch<SanitySiteSettings | null>(`*[_type == "siteSettings"][0]{ theme{ primaryMain, secondaryMain, accentMain } }`)
      .then((doc) => setOverrides(doc?.theme ?? undefined))
      .catch(() => setOverrides(undefined))
  }, [])
  
  // Create theme based on dark mode preference
  const theme = useMemo(() => createTheme(darkMode, overrides), [darkMode, overrides]);
  
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MUIProvider
