import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'position', title: 'Position', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
    defineField({ name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'url' }] }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'string' }),
        defineField({ name: 'github', title: 'GitHub', type: 'string' }),
        defineField({ name: 'gmail', title: 'Gmail/Email', type: 'string' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'string' }),
      ],
    }),
  ],
})
