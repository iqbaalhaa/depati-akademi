import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'

import { TestimonialItem } from '@/components/testimonial'
import type { Testimonial } from '@/interfaces/testimonial'
import type { SanityHomePage, SanityTestimonial } from '@/interfaces/sanity'
import { sanityFetch, urlFor } from '@/utils/sanity'

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
        bottom: { xs: '-28px !important', md: '64px !important' },
        left: 'unset !important',
        right: type === 'prev' ? '90px !important' : '30px !important',
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

const StyledSlickContainer = styled('div')(() => ({
  position: 'relative',

  '& .slick-list': { marginLeft: '-30px', marginBottom: '24px' },
}))

const HomeTestimonial: FC = () => {
  const sliderRef = useRef(null)
  const [items, setItems] = useState<Testimonial[]>([])
  const [homeMeta, setHomeMeta] = useState<Partial<SanityHomePage> | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [home, testimonials] = await Promise.all([
          sanityFetch<SanityHomePage>(`*[_type == "home"][0]{ testimonialTitle, testimonialImage }`),
          sanityFetch<SanityTestimonial[]>(
            `*[_type == "testimonial"]|order(_createdAt desc){ _id, name, photo, content, rating }`
          ),
        ])

        const mapped: Testimonial[] = (testimonials || []).map((t) => ({
          id: t._id,
          title: t.name || 'Testimonial',
          content: t.content,
          user: {
            id: t._id,
            name: t.name,
            professional: 'Student',
            photo: t.photo ? urlFor(t.photo).width(100).height(100).fit('crop').url() : '1.jpg',
          },
        }))

        if (mounted) {
          setItems(mapped)
          setHomeMeta(home || null)
        }
      } catch (err) {
        console.error('Failed to load testimonials from Sanity:', err)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const sliderConfig: Settings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
  }

  return (
    <Box id="testimonial" sx={{ pb: { xs: 6, md: 10 }, backgroundColor: 'background.paper' }}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography
              component="h2"
              sx={{
                position: 'relative',
                fontSize: { xs: 36, md: 46 },
                mt: { xs: 0, md: 7 },
                mb: 4,
                lineHeight: 1,
                fontWeight: 'bold',
              }}
            >
              {homeMeta?.testimonialTitle || 'Testimonial What our Students Say'}
            </Typography>

            <StyledSlickContainer>
              <Slider ref={sliderRef} {...sliderConfig}>
                {items.map((item, index) => (
                  <TestimonialItem key={String(index)} item={item} />
                ))}
              </Slider>
            </StyledSlickContainer>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ width: { xs: '100%', md: '90%' } }}>
              {homeMeta?.testimonialImage ? (
                <Image
                  src={urlFor(homeMeta.testimonialImage).width(420).height(440).fit('max').url()}
                  width={420}
                  height={440}
                  quality={97}
                  alt="Testimonial img"
                />
              ) : (
                <Image src="/images/home-testimonial.png" width={420} height={440} quality={97} alt="Testimonial img" />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeTestimonial
