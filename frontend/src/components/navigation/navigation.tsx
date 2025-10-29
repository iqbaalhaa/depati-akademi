import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { Link as ScrollLink } from 'react-scroll'
import { navigations } from './navigation.data'

const Navigation: FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {navigations.map(({ path: destination, label }) => (
        <ScrollLink
          key={destination}
          activeClass="current"
          to={destination}
          spy={true}
          smooth={true}
          duration={350}
          className="react-scroll-link"
          style={{
            position: 'relative',
            color: destination === '/' ? '#1976d2' : '#637381',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            marginBottom: '0',
            fontSize: 'inherit',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 12,
              transform: 'rotate(3deg)',
              display: 'none',
            }}
            className="headline-curve"
          >
            {/* eslint-disable-next-line */}
            <img src="/images/headline-curve.svg" alt="Headline curve" style={{ width: 44, height: 'auto' }} />
          </div>
          {label}
        </ScrollLink>
      ))}
    </Box>
  )
}

export default Navigation
