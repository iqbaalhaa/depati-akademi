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
          price,
          duration,
          image,
          rating,
          ratingCount
        }`
      )
      .then((items) => {
        const mapped: Course[] = items.map((p) => ({
          id: p._id,
          title: p.title,
          cover: p.image
            ? builder.image(p.image).width(360).height(240).url()
            : '/images/courses/christopher-gower-m_HRfLhgABo-unsplash.jpg',
          rating: typeof p.rating === 'number' ? p.rating : 5,
          ratingCount: typeof p.ratingCount === 'number' ? p.ratingCount : 0,
          price: typeof p.price === 'number' ? p.price : 0,
          category: p.duration || 'Program',
        }))
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                height: '100%',
                width: { xs: '100%', md: '90%' },
                display: 'flex',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h1" sx={{ mt: { xs: 0, md: -5 }, fontSize: { xs: 20, md: 43 } }}>
                Kursus Paling Populer
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Link href="/programs" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ boxShadow: 1, '&:hover': { boxShadow: 2 } }}
                  >
                    Lihat Semua Kursus
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            {!loading && (
              <Slider {...sliderConfig}>
                {courses.map((item) => (
                  <CourseCardItem key={String(item.id)} item={item} />
                ))}
              </Slider>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePopularCourse
