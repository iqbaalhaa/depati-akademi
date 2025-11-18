import React, { FC } from 'react'
// Using native img via MUI Box to avoid Next/Image TS type conflict during build
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton, { iconButtonClasses } from '@mui/material/IconButton'
import { Course } from '@/interfaces/course'
import NextLink from 'next/link'
import Button from '@mui/material/Button'
import Link from 'next/link'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'

interface Props {
  item: Course
}

const CourseCardItem: FC<Props> = ({ item }) => {
  const bulletRef = React.useRef<HTMLUListElement | null>(null)
  const [isOverflowing, setIsOverflowing] = React.useState(false)

  React.useEffect(() => {
    const el = bulletRef.current
    if (!el) return
    const check = (): void => {
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
          position: 'relative',
          transition: (theme: any) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
            [`& .${iconButtonClasses.root}`]: {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
            },
          },
          display: 'flex',
          flexDirection: 'column',
          height: 520,
        }}
      >
        {typeof item.discountPercent === 'number' && item.discountPercent > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'success.main',
              color: 'success.contrastText',
              px: 1.2,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
              fontWeight: 700,
              boxShadow: 1,
              zIndex: 3,
            }}
          >
            Diskon {item.discountPercent}%
          </Box>
        )}
        {item.badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'warning.main',
              color: 'warning.contrastText',
              px: 1.2,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
              fontWeight: 700,
              boxShadow: 1,
              zIndex: 3,
            }}
          >
            {item.badge}
          </Box>
        )}
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3,
            mb: 2,
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={item.cover}
            alt={'Course ' + item.id}
            width={360}
            height={240}
            loading="lazy"
            sx={{ display: 'block', width: '100%', height: 240, objectFit: 'cover', position: 'relative', zIndex: 1 }}
          />
          
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2, height: 56, overflow: 'hidden', fontSize: '1.2rem' }}>
            <Box
              component={NextLink}
              href={`/programs/${item.slug || item.id}`}
              sx={{ color: 'text.primary', textDecoration: 'none' }}
            >
              {item.title}
            </Box>
          </Typography>
          {/* Rating stars removed per request */}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {typeof item.originalPrice === 'number' && item.originalPrice > (Number(item.price) || 0) && (
              <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through', mb: 0.5 }}>
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
                <Typography component="span" variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  / bulan
                </Typography>
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
          {/* <IconButton
            color="primary"
            component={NextLink}
            href={`/programs/${item.slug || item.id}`}
            sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
          >
            <ArrowForward />
          </IconButton> */}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Link href={`/programs/${item.slug || item.id}`} passHref>
            <Button variant="contained" color="primary" sx={{ fontWeight: 700 }}>
              Beli Paket
            </Button>
          </Link>
        </Box>

        {/* Bullet points below CTA */}
        <Box
          component="ul"
          ref={bulletRef}
          sx={{
            mt: 2,
            mb: 1,
            pl: 0,
            listStyle: 'none',
            flexGrow: 1,
            overflow: 'hidden',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 28,
              background: (theme: any) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(to bottom, rgba(34,33,40,0), rgba(34,33,40,1))'
                  : 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
              display: isOverflowing ? 'block' : 'none',
            },
          }}
        >
          {(item.bullets || [
            'Belajar intensif di kelas dengan tryout persiapan',
            'Sesi pertemuan online hingga 10x seminggu',
            'Akses materi dan latihan dengan kelas yang seru',
          ]).map((text, idx) => (
            <Box key={String(idx)} component="li" sx={{ display: 'flex', alignItems: 'flex-start', mb: idx !== (item.bullets?.length || 3) - 1 ? 1 : 0 }}>
              <CheckCircleOutline sx={{ color: 'success.main', fontSize: 18, mr: 1, mt: '2px' }} />
              <Typography variant="body2">{text}</Typography>
            </Box>
          ))}
        </Box>

        {/* Detail link at the very bottom */}
        {isOverflowing && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href={`/programs/${item.slug || item.id}`} passHref>
              <Typography variant="body2" sx={{ color: 'primary.main' }}>
                Lihat Detail
              </Typography>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CourseCardItem
