import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import { client } from '@/sanity/lib/client'
import type { SanitySiteSettings } from '@/interfaces/sanity'
// import { HomeFeature, HomeHero, HomePopularCourse, HomeTestimonial, HomeOurMentors, DynamicHomeNewsLetter } from '@/components/home'

const DynamicHomeHero = dynamic(() => import('../components/home/hero'))
const DynamicHomeFeature = dynamic(() => import('../components/home/feature'))
const DynamicHomePopularCourse = dynamic(() => import('../components/home/popular-courses'))
const DynamicHomeTestimonial = dynamic(() => import('../components/home/testimonial'))
const DynamicHomeOurMentors = dynamic(() => import('../components/home/mentors'))
const DynamicHomeNewsLetter = dynamic(() => import('../components/home/newsletter'))
const DynamicHomeGallery = dynamic(() => import('../components/home/gallery'))

const Home: NextPageWithLayout = () => {
  const [settings, setSettings] = useState<SanitySiteSettings | null>(null)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    client
      .fetch<SanitySiteSettings | null>(`*[_type == "siteSettings"][0]{
        showHero,
        showPopularCourse,
        showGallery,
        showFeature,
        showMentors,
        showTestimonial,
        showNewsLetter
      }`)
      .then((doc) => setSettings(doc))
      .catch(() => setSettings(null))
  }, [])
  return (
    <>
      {(settings?.showHero ?? true) && <DynamicHomeHero />}
      {(settings?.showPopularCourse ?? true) && <DynamicHomePopularCourse />}
      {(settings?.showGallery ?? true) && <DynamicHomeGallery />}
      {(settings?.showFeature ?? true) && <DynamicHomeFeature />}
      {(settings?.showMentors ?? true) && <DynamicHomeOurMentors />}
      {(settings?.showTestimonial ?? true) && <DynamicHomeTestimonial />}
      {(settings?.showNewsLetter ?? true) && <DynamicHomeNewsLetter />}
    </>
  )
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default Home
