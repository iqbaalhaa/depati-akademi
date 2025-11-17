import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type FooterSectionTitleProps = { title: string }

const FooterSectionTitle = ({ title }: FooterSectionTitleProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
      }}
    >
      <Typography component="p" variant="h5" sx={{ color: 'inherit', fontWeight: '700' }}>
        {title}
      </Typography>
    </Box>
  )
}

export default FooterSectionTitle
