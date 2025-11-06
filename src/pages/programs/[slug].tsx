import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import type { SanityProgram, SanityImage } from '@/interfaces/sanity'
import { MainLayout } from '@/components/layout'

interface PageProps {
  program: {
    id: string
    title: string
    description?: string
    imageUrl?: string
    price: number
    originalPrice?: number
    discountPercent?: number
    duration?: string
    rating?: number
    ratingCount?: number
  } | null
}

const formatIDR = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v)

const ProgramDetailPage: NextPage<PageProps> & { getLayout?: (page: React.ReactElement) => React.ReactNode } = ({
  program,
}) => {
  if (!program) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h2">Program tidak ditemukan</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Silakan kembali ke halaman program.</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            <Box
              component="img"
              src={program.imageUrl || '/images/home-hero1.jpg'}
              alt={program.title}
              width={800}
              height={450}
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
            {program.title}
          </Typography>

          <Box sx={{ p: 2, borderRadius: 2, boxShadow: 2, backgroundColor: 'background.paper', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
              Batch 1
            </Typography>
            {typeof program.originalPrice === 'number' && program.originalPrice > program.price && (
              <Typography variant="body1" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                {formatIDR(program.originalPrice)}
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h4" color="primary.main">
                {formatIDR(program.price)}
              </Typography>
              {program.discountPercent && program.discountPercent > 0 && (
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
                  }}
                >
                  -{program.discountPercent}%
                </Box>
              )}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Early-bird berlaku sesuai ketentuan.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary">Daftar Sekarang</Button>
            <Button variant="outlined" color="primary">Dapatkan Promo</Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Tentang Bootcamp</Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {program.description || 'Belum ada deskripsi untuk program ini.'}
        </Typography>
      </Box>
    </Container>
  )
}

ProgramDetailPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const slug = String(params?.slug || '')
  try {
    const builder = imageUrlBuilder(client)
    const p = await client.fetch<SanityProgram>(
      `*[_type == "program" && slug.current == $slug][0]{
        _id,
        title,
        description,
        image,
        price,
        normalPrice,
        discountPrice,
        duration,
        rating,
        ratingCount
      }`,
      { slug }
    )

    if (!p) {
      return { props: { program: null } }
    }

    const normal = typeof p.normalPrice === 'number' ? p.normalPrice : (typeof p.price === 'number' ? p.price : 0)
    const discount = typeof p.discountPrice === 'number' ? p.discountPrice : normal
    const percent = normal > 0 && discount < normal ? Math.round(((normal - discount) / normal) * 100) : 0

    const imageUrl = p.image ? builder.image(p.image as SanityImage).width(800).height(450).url() : undefined

    return {
      props: {
        program: {
          id: p._id,
          title: p.title,
          description: p.description,
          imageUrl,
          price: discount,
          originalPrice: normal,
          discountPercent: percent > 0 ? percent : undefined,
          duration: p.duration,
          rating: p.rating,
          ratingCount: p.ratingCount,
        },
      },
    }
  } catch (err) {
    console.error('Sanity fetch error (program detail):', err)
    return { props: { program: null } }
  }
}

export default ProgramDetailPage