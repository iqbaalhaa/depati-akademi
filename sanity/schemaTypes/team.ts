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
  ],
})
