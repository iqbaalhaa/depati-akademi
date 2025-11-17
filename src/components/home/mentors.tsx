import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled } from '@mui/material/styles'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'
import { MentorCardItem } from '@/components/mentor'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import type { Mentor } from '@/interfaces/mentor'
import type { SanityTeamMember, SanityHomePage } from '@/interfaces/sanity'

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
        bottom: '-28px !important',
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

const HomeOurMentors: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionTitle, setSectionTitle] = useState<string>('Our Expert Mentors')
  const fetchedRef = useRef(false)
  const builder = useMemo(() => imageUrlBuilder(client), [])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    // Fetch mentors list
    client
      .fetch<SanityTeamMember[]>(
        `*[_type == "team"] | order(_createdAt desc)[0...9]{
          _id,
          name,
          position,
          photo,
          bio,
          social{ instagram, github, gmail, linkedin }
        }`
      )
      .then((items) => {
        const mapped: Mentor[] = items.map((t) => ({
          id: t._id,
          name: t.name,
          photo: t.photo
            ? builder.image(t.photo).width(360).height(480).url()
            : '/images/mentors/philip-martin-5aGUyCW_PJw-unsplash.jpg',
          category: t.position || 'Mentor',
          description: t.bio || '',
          social: t.social
          // company info not in schema; leaving undefined
        }))
        setMentors(mapped)
      })
      .catch((err) => {
        console.error('Sanity fetch error (team):', err)
        setMentors([])
      })
      .finally(() => setLoading(false))
    
    // Fetch section title from Home document
    client
      .fetch<SanityHomePage | null>(`*[_type == "home"][0]{ mentorsTitle }`)
      .then((home) => {
        if (home?.mentorsTitle) setSectionTitle(home.mentorsTitle)
      })
      .catch(() => { return null })
  }, [builder])

  const sliderConfig: Settings = {
    infinite: mentors.length > (matchMobileView ? 1 : 4),
    autoplay: true,
    speed: 300,
    slidesToShow: Math.min(matchMobileView ? 1 : 4, Math.max(mentors.length, 1)),
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
      id="mentors"
      sx={{
        pt: {
          xs: 4,
          md: 8,
        },
        pb: {
          xs: 6,
          md: 12,
        },
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : '#ecf3f3',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ fontSize: 40 }}>
          {sectionTitle}
        </Typography>

        {!loading && (
          <Slider {...sliderConfig}>
            {mentors.map((item) => (
              <MentorCardItem key={String(item.id)} item={item} />
            ))}
          </Slider>
        )}
      </Container>
    </Box>
  )
}

export default HomeOurMentors
