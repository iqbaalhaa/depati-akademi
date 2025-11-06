import React, { FC, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { FooterNavigation, FooterSocialLinks } from '@/components/footer'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/utils/sanity'
import type { SanityFooter, SanitySocialLink } from '@/interfaces/sanity'
import type { SocialLink } from '@/interfaces/social-link'

const Footer: FC = () => {
  const [settings, setSettings] = useState<SanityFooter | null>(null)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    client
      .fetch<SanityFooter>(
        `*[_type == "footer"][0]{
          title,
          description,
          backgroundColor,
          textColor,
          backgroundImage,
          socialLinks[]{ name, link, icon },
          courseMenu[]{ label, path },
          pageMenu[]{ label, path },
          companyMenu[]{ label, path },
          copyright
        }`
      )
      .then((res) => setSettings(res || null))
      .catch((err) => {
        console.error('Sanity fetch error (footer settings):', err)
        setSettings(null)
      })
  }, [])

  const bgColor = settings?.backgroundColor || 'primary.main'
  const textColor = settings?.textColor || 'primary.contrastText'
  const bgImageUrl = settings?.backgroundImage ? urlFor(settings.backgroundImage).width(1600).url() : null
  const title = settings?.title || 'Coursespace'
  const description = settings?.description || 'Coursespace is an online learning platform that has been operating since 2018 until now.'
  const copyright = settings?.copyright || `© ${new Date().getFullYear()} ${title}. All rights reserved.`
  const dynamicSocialLinks: SocialLink[] = (settings?.socialLinks || []).map((s: SanitySocialLink) => ({
    name: s.name,
    link: s.link || '/',
    icon: s.icon ? urlFor(s.icon).width(22).height(22).url() : undefined,
  }))

  const navCourse = (settings?.courseMenu || []).map((i) => ({ label: i?.label ?? 'Item', path: i?.path || '#' }))
  const navPage = (settings?.pageMenu || []).map((i) => ({ label: i?.label ?? 'Item', path: i?.path || '#' }))
  const navCompany = (settings?.companyMenu || []).map((i) => ({ label: i?.label ?? 'Item', path: i?.path || '#' }))

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        py: { xs: 6, md: 10 },
        ...(bgImageUrl
          ? {
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : {}),
      }}
    >
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Box sx={{ width: { xs: '100%', md: 360 }, mb: { xs: 3, md: 0 } }}>
              <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
                {title}
              </Typography>
              <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
                {description}
              </Typography>
              <FooterSocialLinks links={dynamicSocialLinks} />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <FooterNavigation courseMenu={navCourse} pageMenu={navPage} companyMenu={navCompany} />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: 4 }}>
        <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
          {copyright}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
