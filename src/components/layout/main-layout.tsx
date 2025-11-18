import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import WhatsAppFloatingButton from '@/components/whatsapp-floating'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box component="main" sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <Header />
      {children}
      <Footer />
      <WhatsAppFloatingButton />
    </Box>
  )
}

export default MainLayout
