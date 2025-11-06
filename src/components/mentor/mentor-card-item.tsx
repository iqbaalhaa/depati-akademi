import React, { FC } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import { alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

import { Mentor } from '@/interfaces/mentor'

interface Props {
  item: Mentor
}

const MentorCardItem: FC<Props> = ({ item }) => {
  const cardHeight = 380
  return (
    <Box sx={{ px: 1.5, py: 5 }}>
      <Box
        sx={{
          perspective: 1200,
          '&:hover .flip-inner': { transform: 'rotateY(180deg)' },
          // Ensure only the visible face receives pointer events
          '& .front-face': { pointerEvents: 'auto' },
          '& .back-face': { pointerEvents: 'none' },
          '&:hover .front-face': { pointerEvents: 'none' },
          '&:hover .back-face': { pointerEvents: 'auto' },
        }}
      >
        <Box
          className="flip-inner"
          sx={{
            position: 'relative',
            width: '100%',
            height: cardHeight,
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front Face */}
          <Box
            className="front-face"
            sx={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              p: 2,
              borderRadius: 3,
              boxShadow: 6,
              display: 'flex',
              flexDirection: 'column',
              background: (theme: Theme) =>
                `linear-gradient(135deg,
                  ${alpha(theme.palette.primary.main, 0.28)} 0%,
                  ${alpha(theme.palette.secondary.main, 0.26)} 45%,
                  ${alpha(theme.palette.primary.light || theme.palette.primary.main, 0.22)} 100%
                )`,
              border: (theme: Theme) => `1px solid ${alpha(theme.palette.primary.main, 0.20)}`,
            }}
          >
            <Box
              sx={{
                lineHeight: 0,
                overflow: 'hidden',
                borderRadius: 3,
                height: 280,
                mb: 2,
                position: 'relative',
                transform: 'translateZ(25px)',
              }}
            >
              <Image
                src={item.photo as string}
                alt={'Mentor ' + item.id}
                fill
                sizes="(max-width: 600px) 100vw, 320px"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </Box>
            <Typography component="h2" variant="h4" sx={{ fontSize: '1.2rem', fontWeight: 700, transform: 'translateZ(15px)' }}>
              {item.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', transform: 'translateZ(15px)' }}>{item.category}</Typography>
          </Box>

          {/* Back Face */}
          <Box
            className="back-face"
            sx={{
              position: 'absolute',
              inset: 0,
              transform: 'rotateY(180deg) translateZ(20px)',
              backfaceVisibility: 'hidden',
              p: 2,
              borderRadius: 3,
              boxShadow: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: (theme: Theme) =>
                `linear-gradient(135deg,
                  ${alpha(theme.palette.secondary.main, 0.32)} 0%,
                  ${alpha(theme.palette.primary.main, 0.30)} 50%,
                  ${alpha(theme.palette.secondary.light || theme.palette.secondary.main, 0.26)} 100%
                )`,
              border: (theme: Theme) => `1px solid ${alpha(theme.palette.secondary.main, 0.24)}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
              {item.category}
            </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            {item.description || 'Belum ada deskripsi.'}
          </Typography>

          {/* Social icons row */}
          {(item.social?.instagram || item.social?.github || item.social?.gmail || item.social?.linkedin) && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, transform: 'translateZ(10px)' }}>
              {item.social?.instagram && item.social.instagram.trim() !== '' && (
                <IconButton
                  aria-label="Instagram"
                  component="a"
                  href={item.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'background.paper',
                    '&:hover': (theme: Theme) => ({
                      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(
                        theme.palette.secondary.main,
                        0.85
                      )} 100%)`,
                      color: theme.palette.primary.contrastText,
                    }),
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
              )}
              {item.social?.github && item.social.github.trim() !== '' && (
                <IconButton
                  aria-label="GitHub"
                  component="a"
                  href={item.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'background.paper',
                    '&:hover': (theme: Theme) => ({
                      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(
                        theme.palette.secondary.main,
                        0.85
                      )} 100%)`,
                      color: theme.palette.primary.contrastText,
                    }),
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              )}
              {item.social?.gmail && item.social.gmail.trim() !== '' && (
                <IconButton
                  aria-label="Email"
                  component="a"
                  href={item.social.gmail.includes('@') && !item.social.gmail.startsWith('http') ? `mailto:${item.social.gmail}` : item.social.gmail}
                  target={item.social.gmail.includes('@') && !item.social.gmail.startsWith('http') ? undefined : '_blank'}
                  rel={item.social.gmail.includes('@') && !item.social.gmail.startsWith('http') ? undefined : 'noopener noreferrer'}
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'background.paper',
                    '&:hover': (theme: Theme) => ({
                      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(
                        theme.palette.secondary.main,
                        0.85
                      )} 100%)`,
                      color: theme.palette.primary.contrastText,
                    }),
                  }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              )}
              {item.social?.linkedin && item.social.linkedin.trim() !== '' && (
                <IconButton
                  aria-label="LinkedIn"
                  component="a"
                  href={item.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'background.paper',
                    '&:hover': (theme: Theme) => ({
                      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(
                        theme.palette.secondary.main,
                        0.85
                      )} 100%)`,
                      color: theme.palette.primary.contrastText,
                    }),
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default MentorCardItem
