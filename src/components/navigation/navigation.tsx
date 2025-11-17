import React, { FC, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import NextLink from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { navigations } from './navigation.data'
import { client } from '@/sanity/lib/client'
import type { SanitySiteSettings } from '@/interfaces/sanity'

const Navigation: FC = () => {
  const [settings, setSettings] = useState<SanitySiteSettings | null>(null)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    client
      .fetch<SanitySiteSettings | null>(
        `*[_type == "siteSettings"][0]{
        showHero,
        showPopularCourse,
        showGallery,
        showFeature,
        showMentors,
        showTestimonial,
        showNewsLetter
      }`
      )
      .then((doc) => setSettings(doc))
      .catch(() => setSettings(null))
  }, [])

  const visibleNavigations = navigations.filter(({ path }) => {
    switch (path) {
      case 'popular-course':
        return settings?.showPopularCourse ?? true
      case 'testimonial':
        return settings?.showTestimonial ?? true
      case 'gallery':
        return settings?.showGallery ?? true
      case 'feature':
        return settings?.showFeature ?? true
      case 'mentors':
        return settings?.showMentors ?? true
      default:
        return true // keep Home and other links
    }
  })
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {visibleNavigations.map(({ path: destination, label }) => {
        const isPageLink = destination.startsWith('/') || destination === '#'
        const commonStyle: React.CSSProperties = {
          position: 'relative',
          color: destination === '/' ? '#2365b7' : '#4a4f54ff',
          cursor: 'pointer',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          marginBottom: '0',
          fontSize: 'inherit',
        }

        const HeadlineCurve = (
          <div
            style={{ position: 'absolute', top: 12, transform: 'rotate(3deg)', display: 'none' }}
            className="headline-curve"
          >
            {/* eslint-disable-next-line */}
            <img src="/images/headline-curve.svg" alt="Headline curve" style={{ width: 44, height: 'auto' }} />
          </div>
        )

        if (isPageLink) {
          const href = destination === '#' ? '/' : destination
          return (
            <NextLink key={destination} href={href} className="react-scroll-link" style={commonStyle}>
              {HeadlineCurve}
              {label}
            </NextLink>
          )
        }

        return (
          <ScrollLink
            key={destination}
            activeClass="current"
            to={destination}
            spy={true}
            smooth={true}
            duration={350}
            className="react-scroll-link"
            style={commonStyle}
          >
            {HeadlineCurve}
            {label}
          </ScrollLink>
        )
      })}
    </Box>
  )
}

export default Navigation
