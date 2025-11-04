import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

// Reuse the shared Next-Sanity client and a single builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to fetch data from Sanity with error handling and retry logic
export async function sanityFetch<T = any>(query: string, params = {}, retries = 3): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await client.fetch(query, params)
      return result
    } catch (error) {
      console.error(`Sanity fetch attempt ${attempt} failed:`, error)
      
      if (attempt === retries) {
        console.error('All Sanity fetch attempts failed, throwing error')
        throw error
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt - 1) * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw new Error('Sanity fetch failed after all retries')
}