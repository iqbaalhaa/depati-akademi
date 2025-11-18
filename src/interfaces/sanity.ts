// Sanity image type
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Base Sanity document
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Testimonial interface
export interface SanityTestimonial extends SanityDocument {
  _type: 'testimonial'
  name: string
  photo?: SanityImage
  content: string
  rating: number
}

// Statistics item for home page
export interface StatItem {
  _key: string
  label: string
  value: string
}

// Home page interface
export interface SanityHomePage extends SanityDocument {
  _type: 'home'
  heroTitle: string
  heroSubtitle: string
  heroImage?: SanityImage
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  stats?: StatItem[]
  certificateTitle: string
  certificateDescription: string
  popularCoursesTitle?: string
  mentorsTitle?: string
  testimonialTitle?: string
  testimonialImage?: SanityImage
}

// Program interface (basic structure)
export interface SanityProgram extends SanityDocument {
  _type: 'program'
  title: string
  description?: string
  slug?: { current: string }
  image?: SanityImage
  badge?: string
  bullets?: string[]
  price?: number
  normalPrice?: number
  discountPrice?: number
  duration?: string
  rating?: number
  ratingCount?: number
}

// Team member interface
export interface SanityTeamMember extends SanityDocument {
  _type: 'team'
  name: string
  position: string
  photo?: SanityImage
  bio?: string
  social?: {
    instagram?: string
    github?: string
    gmail?: string
    linkedin?: string
  }
}

// Site settings interface
export interface SanitySiteSettings extends SanityDocument {
  _type: 'siteSettings'
  title: string
  description?: string
  logo?: SanityImage
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  showHero?: boolean
  showPopularCourse?: boolean
  showGallery?: boolean
  showFeature?: boolean
  showMentors?: boolean
  showTestimonial?: boolean
  showNewsLetter?: boolean
  theme?: {
    primaryMain?: string
    secondaryMain?: string
    accentMain?: string
  }
}

// Footer settings interface
export interface SanityFooter extends SanityDocument {
  _type: 'footer'
  title?: string
  description?: string
  backgroundColor?: string
  textColor?: string
  backgroundImage?: SanityImage
  socialLinks?: SanitySocialLink[]
  courseMenu?: SanityNavItem[]
  pageMenu?: SanityNavItem[]
  companyMenu?: SanityNavItem[]
  copyright?: string
}

export interface SanitySocialLink {
  name: string
  link: string
  icon?: SanityImage
}

export interface SanityNavItem {
  label: string
  path: string
}