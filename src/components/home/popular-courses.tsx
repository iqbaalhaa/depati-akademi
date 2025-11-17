import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme, styled } from '@mui/material/styles'
import { IconButton, useMediaQuery } from '@mui/material'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'

import Button from '@mui/material/Button'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { CourseCardItem } from '@/components/course'
import type { Course } from '@/interfaces/course'
import type { SanityProgram } from '@/interfaces/sanity'

interface SliderArrowArrow {
  onClick?: () => void
  type: 'next' | 'prev'
  className?: 'string'
}

const SliderArrow: FC<SliderArrowArrow> = (props) => {
  const { onClick, type, className } = props
  return (
    <IconButton
      sx={{
        backgroundColor: 'background.paper',
        color: 'primary.main',
        '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' },
        bottom: { xs: '-70px !important', md: '-28px !important' },
        left: 'unset !important',
        right: type === 'prev' ? '60px !important' : '0 !important',
        zIndex: 10,
        boxShadow: 1,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? <IconArrowForward sx={{ fontSize: 22 }} /> : <IconArrowBack sx={{ fontSize: 22 }} />}
    </IconButton>
  )
}

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -20,
    paddingLeft: theme.spacing(1),
    textAlign: 'left',
    '& li': {
      marginRight: theme.spacing(2),
      '&.slick-active>div': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const HomePopularCourse: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const fetchedRef = useRef(false)

  const builder = useMemo(() => imageUrlBuilder(client), [])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    client
      .fetch<SanityProgram[]>(
        `*[_type == "program"] | order(_createdAt desc)[0...9]{
          _id,
          title,
          slug,
          price,
          normalPrice,
          discountPrice,
          duration,
          image,
          rating,
          ratingCount
        }`
      )
      .then((items) => {
        const mapped: Course[] = items.map((p) => {
          const normal = typeof p.normalPrice === 'number'
            ? p.normalPrice
            : (typeof p.price === 'number' ? p.price : 0)
          const discount = typeof p.discountPrice === 'number'
            ? p.discountPrice
            : normal
          const percent = normal > 0 && discount < normal
            ? Math.round(((normal - discount) / normal) * 100)
            : 0
          return {
            id: p._id,
            slug: p.slug?.current,
            title: p.title,
            cover: p.image
              ? builder.image(p.image).width(360).height(240).url()
              : '/images/courses/christopher-gower-m_HRfLhgABo-unsplash.jpg',
            rating: typeof p.rating === 'number' ? p.rating : 5,
            ratingCount: typeof p.ratingCount === 'number' ? p.ratingCount : 0,
            price: discount,
            originalPrice: normal,
            discountPercent: percent > 0 ? percent : undefined,
            category: p.duration || 'Program',
          }
        })
        setCourses(mapped)
      })
      .catch((err) => {
        console.error('Sanity fetch error (programs):', err)
        setCourses([])
      })
      .finally(() => setLoading(false))
  }, [builder])

  const slidesToShow = Math.min(matchMobileView ? 1 : 3, Math.max(courses.length, 1))
  const sliderConfig: Settings = {
    infinite: courses.length > slidesToShow,
    autoplay: true,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box sx={{ height: 8, width: 30, backgroundColor: 'divider', display: 'inline-block', borderRadius: 4 }} />
    ),
  }

  return (
    <Box
      id="popular-course"
      sx={{
        pt: {
          xs: 6,
          md: 8,
        },
        pb: 14,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section title at the top */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: 20, md: 43 } }}>
            Kursus Paling Populer
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            {!loading && (
              <Slider {...sliderConfig}>
                {courses.map((item) => (
                  <CourseCardItem key={String(item.id)} item={item} />
                ))}
              </Slider>
            )}
          </Grid>

          {/* Right-side CTA card: Lihat semua program kursus */}
          <Grid item xs={12} md={3}>
            <Box sx={{ px: 1, py: 4 }}>
              <Link href="/programs" passHref style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    height: { xs: 360, md: 520 },
                    width: '100%',
                    borderRadius: 4,
                    p: 2,
                    boxShadow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
                        : 'linear-gradient(180deg, #cbe8ff 0%, #9fd4ff 100%)',
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 2 },
                  }}
                >
                  <Box
                    sx={{
                      mt: 'auto',
                      mb: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 22, md: 28 },
                        textDecoration: 'none',
                        textAlign: 'center',
                        mb: 2,
                      }}
                    >
                      Lihat semua program kursus
                    </Typography>
                    <IconButton
                      aria-label="lihat semua program"
                      sx={{
                        backgroundColor: 'background.paper',
                        color: 'primary.main',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        boxShadow: 1,
                        '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' },
                      }}
                    >
                      <IconArrowForward />
                    </IconButton>
                  </Box>

                  <Box sx={{ lineHeight: 0, borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={'/images/home-feature.png'}
                      alt={'Lihat semua program'}
                      sx={{ display: 'block', width: '100%', height: { xs: 160, md: 240 }, objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </Box>
                </Box>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePopularCourse
