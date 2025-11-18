import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

interface GalleryItem {
  id: string
  title: string
  imageUrl: string
}

const HomeGallery: FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const fetchedRef = useRef(false)
  const builder = useMemo(() => imageUrlBuilder(client), [])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    client
      .fetch<any[]>(
        `*[_type == "gallery"] | order(_createdAt desc)[0...7]{
          _id,
          title,
          image
        }`
      )
      .then((docs) => {
        const mapped: GalleryItem[] = docs.map((g) => ({
          id: g._id,
          title: g.title || 'Untitled',
          imageUrl: g.image ? builder.image(g.image).width(320).height(220).url() : '/images/home-hero1.jpg',
        }))
        setItems(mapped)
      })
      .catch((err) => {
        console.error('Sanity fetch error (gallery):', err)
        setItems([])
      })
      .finally(() => setLoading(false))
  }, [builder])

  return (
    <Box id="gallery" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography component="h2" variant="h1" sx={{ fontWeight: 700, fontSize: { xs: 36, md: 46 }, lineHeight: 1 }}>
            Galeri
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Dokumentasi kegiatan dan suasana belajar di Depati Akademi
          </Typography>
        </Box>

        {loading && (
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Memuat galeri...
          </Typography>
        )}

        {!loading && (
          <Grid container spacing={2}>
            {items.slice(0, 6).map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={320}
                    height={220}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'primary.contrastText',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
            {items.length > 6 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Link href="/gallery" passHref>
                    <Button variant="contained" color="primary" size="large" sx={{ boxShadow: 1, px: 4, py: 1.5 }}>
                      Lihat Selengkapnya
                    </Button>
                  </Link>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default HomeGallery
