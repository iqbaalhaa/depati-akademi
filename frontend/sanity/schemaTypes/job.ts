import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'job',
  title: 'Job Vacancy',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Job Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'requirements', title: 'Requirements', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['open', 'closed'], layout: 'radio' } }),
  ],
})
