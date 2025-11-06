import React, { FC } from 'react'
// Using native img via MUI Box to avoid Next/Image TS type conflict during build
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import IconButton, { iconButtonClasses } from '@mui/material/IconButton'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { Course } from '@/interfaces/course'
import NextLink from 'next/link'

interface Props {
  item: Course
}

const CourseCardItem: FC<Props> = ({ item }) => {
  return (
    <Box
      sx={{
        px: 1,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme: any) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
            [`& .${iconButtonClasses.root}`]: {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={item.cover}
            alt={'Course ' + item.id}
            width={360}
            height={240}
            loading="lazy"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2, height: 56, overflow: 'hidden', fontSize: '1.2rem' }}>
            <Box component={NextLink} href={`/programs/${item.slug || item.id}`} sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {item.title}
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="rating-course" value={item.rating} max={5} sx={{ color: '#ffce31', mr: 1 }} readOnly />
            <Typography component="span" variant="h5">
              ({item.ratingCount})
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {typeof item.originalPrice === 'number' && item.originalPrice > (Number(item.price) || 0) && (
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', textDecoration: 'line-through', mb: 0.5 }}
              >
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(Number(item.originalPrice) || 0)}
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" color="primary.main">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(Number(item.price) || 0)}
              </Typography>
              {typeof item.discountPercent === 'number' && item.discountPercent > 0 && (
                <Box
                  component="span"
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'success.contrastText',
                    backgroundColor: 'success.main',
                    lineHeight: 1,
                  }}
                >
                  -{item.discountPercent}%
                </Box>
              )}
            </Box>
          </Box>
          <IconButton
            color="primary"
            component={NextLink}
            href={`/programs/${item.slug || item.id}`}
            sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseCardItem
