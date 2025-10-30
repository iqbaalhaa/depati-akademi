import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'highlight', title: 'Highlight', type: 'boolean', initialValue: false }),
  ],
})
