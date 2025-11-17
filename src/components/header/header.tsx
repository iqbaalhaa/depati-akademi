import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Logo } from '@/components/logo'
import { Navigation } from '@/components/navigation'
import { useTheme } from '@mui/material/styles'
import { Menu, Close } from '@mui/icons-material'
import ThemeToggle from '@/components/theme-toggle'

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))

  return (
    <Box sx={{ backgroundColor: 'background.paper' }}>
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <Box sx={{ ml: 'auto', display: { xs: 'inline-flex', md: 'none' } }}>
            <IconButton onClick={() => setVisibleMenu(!visibleMenu)}>
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },

              transition: (theme: any) => theme.transitions.create(['right', 'height', 'background-color', 'color']),
              ...(matchMobileView && {
                py: 5,
                px: 2,
                backgroundColor: (theme: any) => theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.paper,
                color: (theme: any) => theme.palette.text.primary,
                zIndex: 'appBar',
                position: 'fixed',
                height: { xs: '100vh', md: 'auto' },
                width: { xs: '75vw', md: 'auto' },
                top: 0,
                right: visibleMenu ? 0 : '-75vw',
                boxShadow: 3,
                borderRadius: '16px 0 0 16px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                gap: 2,
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                overflowY: 'auto',
                '& .react-scroll-link': {
                  color: 'text.primary',
                },
              }),
            }}
          >
            <Box sx={{ order: { xs: -1, md: 0 }, alignSelf: { xs: 'flex-start', md: 'auto' }, mb: { xs: 1, md: 0 } }}>
              {React.createElement(ThemeToggle)}
            </Box>
            <Navigation />
            {visibleMenu && matchMobileView && (
              <IconButton
                sx={{
                  position: 'fixed',
                  top: 10,
                  right: 10,
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
