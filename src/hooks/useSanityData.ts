// ✅ gunakan client resmi Sanity
import { useEffect, useState } from 'react'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xtleexm5',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // true cukup untuk data publik
})

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
