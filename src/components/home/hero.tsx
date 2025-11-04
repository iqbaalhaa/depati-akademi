'use client'
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as ScrollLink } from 'react-scroll'
import { StyledButton } from '@/components/styled-button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

interface Exp {
  label: string
  value: string
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
  heroImage?: any
  experience?: Array<Exp> | null
}

const ExpItem: FC<{ item: Exp }> = ({ item }) => {
  const { value, label } = item
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 0 } }}>
      <Typography
        sx={{ color: 'secondary.main', mb: { xs: 1, md: 2 }, fontSize: { xs: 34, md: 44 }, fontWeight: 'bold' }}
      >
        {value}
      </Typography>
      <Typography color="text.secondary" variant="h5">
        {label}
      </Typography>
    </Box>
  )
}

const HomeHero: FC = () => {
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
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
          experience[]{label, value}
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
  const ctaSecondary = data?.ctaSecondary ?? 'Lihat Program'
  const experience = data?.experience ?? [
    { value: '500+ Siswa', label: 'Telah Lulus dan Siap Kerja' },
    { value: '10+ Program', label: 'Pilihan Sesuai Kebutuhan Industri' },
    { value: '10+ Mentor', label: 'Siap Membimbing Anda dari Nol' },
  ]

  // Build hero image url safely (if heroImage exists)
  const heroImageUrl = data?.heroImage ? urlFor(data.heroImage).width(475).height(487).url() : '/images/home-hero1.jpg'

  return (
    <Box id="hero" sx={{ backgroundColor: 'background.paper', position: 'relative', pt: 4, pb: { xs: 8, md: 10 } }}>
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
                        top: -16,
                        right: -21,
                        width: { xs: 22, md: 30 },
                        height: 'auto',
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
              <Box sx={{ '& button': { mr: 2 } }}>
                <ScrollLink to="popular-course" spy={true} smooth={true} offset={0} duration={350}>
                  <StyledButton color="primary" size="large" variant="contained">
                    {ctaPrimary}
                  </StyledButton>
                </ScrollLink>
                <ScrollLink to="video-section" spy={true} smooth={true} offset={0} duration={350}>
                  <StyledButton color="primary" size="large" variant="outlined" startIcon={<PlayArrowIcon />}>
                    {ctaSecondary}
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
                bottom: 30,
                left: { xs: 0, md: -150 },
                boxShadow: 1,
                borderRadius: 3,
                px: 2,
                py: 1.4,
                zIndex: 1,
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'flex-start',
                width: 280,
              }}
            >
              <Box
                sx={{
                  boxShadow: 1,
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  '& img': { width: '32px !important', height: 'auto' },
                }}
              >
                <Image src="/images/certificate.png" alt="Certificate icon" width={50} height={50} />
              </Box>
              <Box>
                <Typography
                  component="h6"
                  sx={{ color: 'secondary.main', fontSize: '1.1rem', fontWeight: 700, mb: 0.5 }}
                >
                  Sertifikat
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
                  Sertifikat Resmi LPK (Lembaga Pelatihan Kerja).
                </Typography>
              </Box>
            </Box>

            <Box sx={{ lineHeight: 0 }}>
              {/* if heroImageUrl is external (sanity CDN) ensure next.config.js allows cdn.sanity.io */}
              <Image src={heroImageUrl} width={475} height={487} alt="Hero image" />
            </Box>
          </Grid>
        </Grid>

        {/* Experience Section */}
        <Box sx={{ boxShadow: 2, py: 4, px: 7, borderRadius: 4, mt: 6 }}>
          <Grid container spacing={2}>
            {experience.map((item) => (
              <Grid key={item.value} item xs={12} md={4}>
                <ExpItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeHero
