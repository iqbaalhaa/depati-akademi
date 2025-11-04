import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create Sanity client with proper configuration
export const client = createClient({
  projectId: 'xtleexm5',
  dataset: 'production',
  useCdn: false, // Disable CDN for real-time data
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to fetch data from Sanity with error handling and retry logic
export async function sanityFetch<T = any>(query: string, params = {}, retries = 3): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await client.fetch(query, params)
      console.log('Sanity fetch successful:', result)
      return result
    } catch (error) {
      console.error(`Sanity fetch attempt ${attempt} failed:`, error)
      
      if (attempt === retries) {
        console.error('All Sanity fetch attempts failed, throwing error')
        throw error
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt - 1) * 1000
      console.log(`Retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw new Error('Sanity fetch failed after all retries')
}