import React, { FC } from 'react'
import NextLink from 'next/link'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import type { Navigation } from '@/interfaces/navigation'
import { FooterSectionTitle } from '@/components/footer'

const courseMenu: Array<Navigation> = [
  {
    label: 'UI/UX Design',
    path: '/programs',
  },
  {
    label: 'Mobile Development',
    path: '/programs',
  },
  {
    label: 'Machine Learning',
    path: '/programs',
  },
  {
    label: 'Web Development',
    path: '/programs',
  },
]

const pageMenu: Array<Navigation> = [
  { label: 'Home', path: '/' },
  { label: 'Program', path: '/programs' },
  { label: 'Testimonial', path: '/#testimonial' },
  { label: 'Gallery', path: '/#gallery' },
  { label: 'Team', path: '/#mentors' },
]

const companyMenu: Array<Navigation> = [
  { label: 'Contact Us', path: '/' },
  { label: 'Privacy & Policy', path: '/' },
  { label: 'Term & Condition', path: '/' },
  { label: 'FAQ', path: '/' },
]

interface NavigationItemProps {
  label: string
  path: string
}

const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => {
  return (
    <MuiLink
      component={NextLink}
      href={path}
      underline="hover"
      sx={{
        display: 'block',
        mb: 1,
        color: 'primary.contrastText',
      }}
    >
      {label}
    </MuiLink>
  )
}

const FooterNavigation: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Course" />
        {courseMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Menu" />
        {pageMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="About" />
        {companyMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
    </Grid>
  )
}

export default FooterNavigation
