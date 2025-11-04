import React, { useEffect, useMemo, useRef, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import type { Course } from '@/interfaces/course'
import type { SanityProgram } from '@/interfaces/sanity'
import { CourseCardItem } from '@/components/course'

const ProgramsPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const builder = useMemo(() => imageUrlBuilder(client), [])
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    client
      .fetch<SanityProgram[]>(
        `*[_type == "program"] | order(_createdAt desc){
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
          cover: p.image ? builder.image(p.image).width(360).height(240).url() : '/images/courses/christopher-gower-m_HRfLhgABo-unsplash.jpg',
          rating: typeof p.rating === 'number' ? p.rating : 5,
          ratingCount: typeof p.ratingCount === 'number' ? p.ratingCount : 0,
          price: typeof p.price === 'number' ? p.price : 0,
          category: p.duration || 'Program',
        }))
        setCourses(mapped)
      })
      .catch((err) => {
        console.error('Sanity fetch error (/programs):', err)
        setCourses([])
      })
      .finally(() => setLoading(false))
  }, [builder])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 44 }, mb: 3 }}>
        Semua Program Kursus
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 4 }}>
        Jelajahi seluruh program pelatihan di Depati Akademi.
      </Typography>

      {!loading && (
        <Grid container spacing={2}>
          {courses.map((item) => (
            <Grid key={String(item.id)} item xs={12} md={4}>
              <CourseCardItem item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default ProgramsPage