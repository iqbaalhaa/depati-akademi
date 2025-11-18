import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Program Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({
      name: 'bullets',
      title: 'Benefit Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Daftar poin manfaat program yang akan ditampilkan di kartu',
    }),
    defineField({ name: 'badge', title: 'Badge', type: 'string', description: 'Label kecil di gambar, mis: Paling Populer' }),
    // Legacy single price (optional). You can keep using it if needed.
    defineField({ name: 'price', title: 'Price (legacy)', type: 'number' }),
    // New pricing fields
    defineField({ name: 'normalPrice', title: 'Normal Price', type: 'number' }),
    defineField({ name: 'discountPrice', title: 'Discount Price', type: 'number' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', description: '0-5', validation: (Rule) => Rule.min(0).max(5) }),
    defineField({ name: 'ratingCount', title: 'Rating Count', type: 'number', description: 'Jumlah ulasan', validation: (Rule) => Rule.min(0) }),
  ],
})
