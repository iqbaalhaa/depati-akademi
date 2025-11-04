import React, { FC } from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

const Logo: FC<Props> = ({ onClick, variant = 'primary' }) => {
  return (
    <Box onClick={onClick} sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Box sx={{ lineHeight: 0, mr: 1 }}>
        <Image src="/images/logodab.svg" alt="Depati Akademi logo" width={36} height={36} />
      </Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, '& span': { color: variant === 'primary' ? 'primary.main' : 'unset' } }}
      >
        Depati<span>Akademi</span>
      </Typography>
    </Box>
  )
}

export default Logo
