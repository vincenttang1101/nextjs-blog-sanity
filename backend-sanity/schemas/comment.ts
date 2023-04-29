import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: {type: 'post'},
      readOnly: true,
    }),
  ],
})
