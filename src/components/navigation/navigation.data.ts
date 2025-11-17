import type { Navigation } from '@/interfaces/navigation'

export const navigations: Navigation[] = [
  {
    label: 'Home',
    path: '#', // '/',
  },
  {
    label: 'Program',
    path: '/programs', // direct to programs page
  },
  {
    label: 'Gallery',
    path: 'gallery', // '/gallery',
  },
  {
    label: 'Feature',
    path: 'feature', // '/feature',
  },
  {
    label: 'Team',
    path: 'mentors', // '/mentors',
  },
  {
    label: 'Testimonial',
    path: 'testimonial', // '/testimonial',
  },
]
