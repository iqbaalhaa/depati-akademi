import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'content', title: 'Content', type: 'text' }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
  ],
})
