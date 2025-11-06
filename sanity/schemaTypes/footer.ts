import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Footer Title',
      type: 'string',
      description: 'Judul/brand pada footer (opsional)'
    }),
    defineField({
      name: 'description',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      description: 'Deskripsi singkat pada footer (opsional)'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color (mis. #123456) atau nama tema MUI (opsional)'
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color untuk teks footer (opsional)'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Gambar background footer (opsional)'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'link', title: 'Link', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
      description: 'Daftar social media pada footer (opsional)'
    }),
    // Navigation menus
    defineField({
      name: 'courseMenu',
      title: 'Course Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'path', title: 'Path', type: 'string', description: 'Contoh: /programs atau #section' }),
          ],
        },
      ],
      description: 'Menu Course di footer (opsional)'
    }),
    defineField({
      name: 'pageMenu',
      title: 'Page Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'path', title: 'Path', type: 'string' }),
          ],
        },
      ],
      description: 'Menu halaman (opsional)'
    }),
    defineField({
      name: 'companyMenu',
      title: 'Company Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'path', title: 'Path', type: 'string' }),
          ],
        },
      ],
      description: 'Menu perusahaan (opsional)'
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Teks copyright di bagian bawah (opsional)'
    }),
  ],
})