import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'document',
  fields: [
    defineField({ name: 'program', title: 'Program', type: 'reference', to: [{ type: 'program' }] }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'instructor', title: 'Instructor', type: 'string' }),
  ],
})
