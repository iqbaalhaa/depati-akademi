'use client'
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as ScrollLink } from 'react-scroll'
import { StyledButton } from '@/components/styled-button'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/utils/sanity'
import type { SanityImage } from '@/interfaces/sanity'


interface Exp {
  label: string
  value: string
  icon?: string | null
  iconImage?: SanityImage | null
}

interface Headline {
  highlightText?: string | null
  mainText?: string | null
  decoratedText?: string | null
  bottomText?: string | null
}

interface HomeData {
  headline?: Headline | null
  subheadline?: string | null
  ctaPrimary?: string | null
  ctaSecondary?: string | null
  heroImage?: SanityImage | null
  experience?: Array<Exp> | null
}

// ExpItem is no longer used; cards are rendered inline in Experience section

const HomeHero: FC = () => {
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<HomeData>(
        `*[_type == "home"][0]{
          headline{
            highlightText,
            mainText,
            decoratedText,
            bottomText
          },
          subheadline,
          ctaPrimary,
          ctaSecondary,
          heroImage,
          experience[]{label, value, icon, iconImage}
        }`
      )
      .then((res) => {
        setData(res || null)
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err)
        setData(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // While loading, you can return null or a skeleton. Here we'll render nothing until loaded.
  if (loading) return null

  // Provide safe defaults if fields are missing in Sanity
  const headline: Headline = data?.headline ?? {
    highlightText: 'Tingkatkan',
    mainText: 'Keterampilan',
    decoratedText: 'Komputer Anda',
    bottomText: 'di Depati Akademi',
  }

  const subheadline =
    data?.subheadline ??
    'Depati Akademi adalah Lembaga Pelatihan Komputer dan Kerja di Kerinci-Sungai Penuh. Kami menyediakan kursus online yang fleksibel, memungkinkan Anda mengatur waktu belajar sesuai kecepatan Anda.'
  const ctaPrimary = data?.ctaPrimary ?? 'Daftar Sekarang'

  const experience = (
    data?.experience && Array.isArray(data.experience)
      ? data.experience
      : [
          { value: '700+ Siswa', label: 'Telah Lulus dan Siap Kerja' },
          { value: '10+ Program', label: 'Pilihan Sesuai Kebutuhan Industri' },
          { value: '10+ Mentor', label: 'Siap Membimbing Anda dari Nol' },
          { value: 'LPK Resmi', label: 'Terdaftar dan Berizin' },
        ]
  ).slice(0, 4)

  // Build hero image url safely (if heroImage exists)
  const heroImageUrl = data?.heroImage ? urlFor(data.heroImage).width(475).height(487).url() : '/images/home-hero1.jpg'

  return (
    <Box id="hero" sx={{ backgroundColor: 'background.paper', position: 'relative', pt: 4, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ flexDirection: { xs: 'column', md: 'unset' } }}>
          {/* Text Content */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Headline */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 28, md: 48 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    lineHeight: 1.3,
                  }}
                >
                  <Typography
                    component="mark"
                    sx={{
                      position: 'relative',
                      color: 'primary.main',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      backgroundColor: 'unset',
                    }}
                  >
                    {headline.highlightText}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: 24, md: 34 },
                        left: 2,
                        transform: 'rotate(3deg)',
                        '& img': { width: { xs: 130, md: 180 }, height: 'auto' },
                      }}
                    >
                      {/* fallback to public svg */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/headline-curve.svg" alt="Headline curve" />
                    </Box>
                  </Typography>{' '}
                  {headline.mainText}{' '}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      position: 'relative',
                      '& svg': {
                        position: 'absolute',
                        top: { xs: -10, md: -16 },
                        right: { xs: -14, md: -21 },
                        width: { xs: 18, md: 30 },
                        height: 'auto',
                        opacity: { xs: 0.8, md: 1 },
                      },
                    }}
                  >
                    {headline.decoratedText}
                    <svg version="1.1" viewBox="0 0 3183 3072" aria-hidden focusable="false">
                      <g id="Layer_x0020_1">
                        <path
                          fill="#2bb673"
                          d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                        />
                        <path
                          fill="#2bb673"
                          d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                        ></path>
                        <path
                          fill="#2bb673"
                          d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                        ></path>
                      </g>
                    </svg>
                  </Typography>{' '}
                  <br />
                  {headline.bottomText}
                </Typography>
              </Box>

              {/* Subheadline */}
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{subheadline}</Typography>
              </Box>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'stretch', md: 'center' },
                  gap: { xs: 1.5, md: 0 },
                  '& button': { mr: { md: 2 }, mb: { xs: 1.5, md: 0 } },
                }}
              >
                <ScrollLink to="popular-course" spy={false} smooth={true} offset={0} duration={350}>
                  <StyledButton color="primary" size="large" variant="contained">
                    {ctaPrimary}
                  </StyledButton>
                </ScrollLink>
              </Box>
            </Box>
          </Grid>

          {/* Hero Image */}
          <Grid item xs={12} md={5} sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 4, md: 30 },
                left: { xs: 8, md: -150 },
                boxShadow: 1,
                borderRadius: 3,
                px: { xs: 1.5, md: 2 },
                py: { xs: 1, md: 1.4 },
                zIndex: 2,
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'flex-start',
                width: { xs: 240, md: 280 },
              }}
            >
              <Box
                sx={{
                  boxShadow: 1,
                  borderRadius: '50%',
                  width: { xs: 36, md: 44 },
                  height: { xs: 36, md: 44 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  '& img': { width: { xs: '24px !important', md: '32px !important' }, height: 'auto' },
                }}
              >
                <Image src="/images/certificate.png" alt="Certificate icon" width={50} height={50} />
              </Box>
              <Box>
                <Typography
                  component="h6"
                  sx={{ color: 'secondary.main', fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 700, mb: 0.5 }}
                >
                  Sertifikat
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
                  Sertifikat Resmi LPK (Lembaga Pelatihan Kerja).
                </Typography>
              </Box>
            </Box>

            <Box sx={{ lineHeight: 0, width: '100%', maxWidth: { xs: '100%', md: 475 }, mx: { xs: 'auto', md: 0 } }}>
              {/* if heroImageUrl is external (sanity CDN) ensure next.config.js allows cdn.sanity.io */}
              <Image
                src={heroImageUrl}
                alt="Hero image"
                width={475}
                height={487}
                sizes="(max-width: 900px) 100vw, 475px"
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Experience Section */}
        <Box sx={{ backgroundColor: 'background.paper', py: { xs: 3, md: 4 }, mt: 3 }}>
          <Grid container spacing={2}>
            {experience.map((item, idx) => {
              const icons = ['🎓', '📚', '👨‍🏫', '🛡️']
              const emoji = item.icon || icons[idx % icons.length]
              return (
                <Grid key={item.value + idx} item xs={6} md={3}>
                  <Box
                    sx={{
                      backgroundColor: 'background.paper',
                      borderRadius: '18px',
                      p: 2.5,
                      boxShadow: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      textAlign: 'center',
                      minHeight: { xs: 140, md: 160 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    {item.iconImage ? (
                      <Image
                        src={urlFor(item.iconImage).width(36).height(36).url()}
                        alt={item.value}
                        width={36}
                        height={36}
                        style={{ display: 'block' }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: { xs: 20, md: 24 }, mb: 1 }}>{emoji}</Typography>
                    )}
                    <Typography sx={{ color: 'success.main', mb: 0.5, fontSize: { xs: 18, md: 22 }, fontWeight: 700 }}>
                      {item.value}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {item.label}
                    </Typography>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeHero
