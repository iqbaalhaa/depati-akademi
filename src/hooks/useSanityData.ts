// ✅ gunakan client Sanity yang konsisten
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'

export function useHomePageData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "home"][0]{
        heroTitle,
        heroSubtitle,
        heroImage,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
        stats,
        certificateTitle,
        certificateDescription
      }`
      )
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
