import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'showHero', title: 'Tampilkan Hero', type: 'boolean', initialValue: true}),
    defineField({
      name: 'showPopularCourse',
      title: 'Tampilkan Popular Courses',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showGallery',
      title: 'Tampilkan Gallery',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showFeature',
      title: 'Tampilkan Feature',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showMentors',
      title: 'Tampilkan Mentors',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showTestimonial',
      title: 'Tampilkan Testimonial',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showNewsLetter',
      title: 'Tampilkan Newsletter',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'theme',
      title: 'Tema Warna',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'primaryMain',
          title: 'Primary Main',
          type: 'string',
          description: 'Hex warna utama, contoh: #3a6bbd',
          initialValue: '#3a6bbd',
          validation: (rule) => rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).error('Gunakan format hex, contoh: #3a6bbd'),
        }),
        defineField({
          name: 'secondaryMain',
          title: 'Secondary Main',
          type: 'string',
          description: 'Hex warna sekunder, contoh: #ffaf35',
          initialValue: '#ffaf35',
          validation: (rule) => rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).error('Gunakan format hex, contoh: #ffaf35'),
        }),
        defineField({
          name: 'accentMain',
          title: 'Accent/Info Main',
          type: 'string',
          description: 'Warna aksen (dipakai untuk info), contoh: #127C71',
          initialValue: '#127C71',
          validation: (rule) => rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).error('Gunakan format hex, contoh: #127C71'),
        }),
      ],
    }),
  ],
})
