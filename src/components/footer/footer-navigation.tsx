import React from 'react'
import NextLink from 'next/link'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import type { Navigation } from '@/interfaces/navigation'
import { FooterSectionTitle } from '@/components/footer'

interface Props {
  courseMenu?: Array<Navigation>
  pageMenu?: Array<Navigation>
  companyMenu?: Array<Navigation>
}

interface NavigationItemProps {
  label: string
  path: string
}

const NavigationItem = ({ label, path }: NavigationItemProps): JSX.Element => {
  return (
    <MuiLink
      component={NextLink}
      href={path || '#'}
      underline="hover"
      sx={{
        display: 'block',
        mb: 1,
        color: 'inherit',
      }}
    >
      {label}
    </MuiLink>
  )
}

const defaultCourseMenu: Array<Navigation> = [
  { label: 'UI/UX Design', path: '/programs' },
  { label: 'Mobile Development', path: '/programs' },
  { label: 'Machine Learning', path: '/programs' },
  { label: 'Web Development', path: '/programs' },
]

const defaultPageMenu: Array<Navigation> = [
  { label: 'Home', path: '/' },
  { label: 'Program', path: '/programs' },
  { label: 'Testimonial', path: '/#testimonial' },
  { label: 'Gallery', path: '/#gallery' },
  { label: 'Team', path: '/#mentors' },
]

const defaultCompanyMenu: Array<Navigation> = [
  { label: 'Contact Us', path: '/' },
  { label: 'Privacy & Policy', path: '/' },
  { label: 'Term & Condition', path: '/' },
  { label: 'FAQ', path: '/' },
]

const FooterNavigation = ({ courseMenu, pageMenu, companyMenu }: Props): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Course" />
        {(courseMenu && courseMenu.length > 0 ? courseMenu : defaultCourseMenu).map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Menu" />
        {(pageMenu && pageMenu.length > 0 ? pageMenu : defaultPageMenu).map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="About" />
        {(companyMenu && companyMenu.length > 0 ? companyMenu : defaultCompanyMenu).map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
    </Grid>
  )
}

export default FooterNavigation
