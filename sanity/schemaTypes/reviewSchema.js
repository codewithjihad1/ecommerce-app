export const reviewSchema = {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
  ],
}
