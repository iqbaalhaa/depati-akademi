'use client'
import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { client } from '@/sanity/lib/client'

const WhatsAppFloatingButton: React.FC = () => {
  const defaultNumber = '6282280955152'
  const defaultMessage = 'Halo, saya tertarik dengan program di Depati Akademi.'
  const defaultUrl = `https://wa.me/${defaultNumber}?text=${encodeURIComponent(defaultMessage)}`
  const [waUrl, setWaUrl] = useState<string>(defaultUrl)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    client
      .fetch<{ socialLinks?: Array<{ name: string; link: string }> }>(
        `*[_type == "footer"][0]{ socialLinks[]{ name, link } }`
      )
      .then((res) => {
        const links = res?.socialLinks || []
        const wa = links.find((l) => {
          const name = (l.name || '').toLowerCase()
          const link = (l.link || '').toLowerCase()
          return name.includes('whatsapp') || link.includes('wa.me') || link.includes('whatsapp.com')
        })
        if (wa?.link) setWaUrl(wa.link)
      })
      .catch(() => { return null })
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 16, md: 24 },
        zIndex: 1200,
      }}
    >
      <Tooltip title="Chat via WhatsApp" placement="left">
        <Fab
          component="a"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          sx={{
            bgcolor: '#25D366',
            color: '#fff',
            boxShadow: 6,
            '&:hover': { bgcolor: '#1DA851' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </Box>
  )
}

export default WhatsAppFloatingButton