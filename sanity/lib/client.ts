import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xtleexm5'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const useCdn = (process.env.NEXT_PUBLIC_SANITY_USE_CDN || 'false').toLowerCase() === 'true'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Warn at runtime if env vars are missing (helps diagnose Vercel config)
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn('[sanity] Missing env NEXT_PUBLIC_SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_DATASET. Using fallback values.')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn, // default false via env to avoid stale data
})
