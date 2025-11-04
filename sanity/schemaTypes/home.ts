import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'object',
      fields: [
        {
          name: 'highlightText',
          title: 'Highlight Text (biru + underline kuning)',
          type: 'string',
        },
        {
          name: 'mainText',
          title: 'Main Text (setelah highlight)',
          type: 'string',
        },
        {
          name: 'decoratedText',
          title: 'Decorated Text (dengan elemen hijau)',
          type: 'string',
        },
        {
          name: 'bottomText',
          title: 'Bottom Text (baris terakhir)',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'CTA Button 1 (Utama)',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'CTA Button 2 (Sekunder)',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
    }),
    defineField({
      name: 'experience',
      title: 'Experience Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Nilai (contoh: 500+ Siswa)', type: 'string'},
            {name: 'label', title: 'Deskripsi', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'mentorsTitle',
      title: 'Judul Section Mentors',
      type: 'string',
      description: 'Judul untuk section Our Expert Mentors',
      initialValue: 'Our Expert Mentors',
    }),
  ],
})
