import React, { useEffect, useMemo, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/interfaces/layout'

interface GalleryItem {
  id: string
  title: string
  imageUrl: string
}

const GalleryPage: NextPageWithLayout = () => {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const fetchedRef = useRef(false)
  const builder = useMemo(() => imageUrlBuilder(client), [])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    client
      .fetch<any[]>(
        `*[_type == "gallery"] | order(_createdAt desc){
          _id,
          title,
          image
        }`
      )
      .then((docs) => {
        const mapped: GalleryItem[] = docs.map((g) => ({
          id: g._id,
          title: g.title || 'Untitled',
          imageUrl: g.image ? builder.image(g.image).width(480).height(320).url() : '/images/home-hero1.jpg',
        }))
        setItems(mapped)
      })
      .catch((err) => {
        console.error('Sanity fetch error (/gallery):', err)
        setItems([])
      })
      .finally(() => setLoading(false))
  }, [builder])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 44 }, mb: 3 }}>
        Galeri
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 4 }}>
        Kumpulan dokumentasi kegiatan dan suasana belajar di Depati Akademi.
      </Typography>

      {!loading && (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                <Image src={item.imageUrl} alt={item.title} width={480} height={320} style={{ width: '100%', height: 'auto' }} />
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
        </Grid>
      )}
    </Container>
  )
}

GalleryPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default GalleryPage