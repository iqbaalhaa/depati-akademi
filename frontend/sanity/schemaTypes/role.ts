import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'role',
  title: 'Role',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Role Name', type: 'string' }),
    defineField({
      name: 'permissions',
      title: 'Permissions',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['create', 'read', 'update', 'delete'] },
    }),
  ],
})
