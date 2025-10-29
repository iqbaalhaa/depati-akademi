import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'application',
  title: 'Job Application',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'resume', title: 'Resume', type: 'file' }),
    defineField({ name: 'job', title: 'Applied Job', type: 'reference', to: [{ type: 'job' }] }),
  ],
})
