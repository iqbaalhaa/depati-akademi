export interface Course {
  id: number | string
  slug?: string
  title: string
  cover: string
  rating: number
  ratingCount: number
  price: number
  originalPrice?: number
  discountPercent?: number
  category: string
}
