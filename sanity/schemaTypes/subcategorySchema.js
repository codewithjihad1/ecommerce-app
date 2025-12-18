export const SubCategory = {
  name: 'subcategory',
  title: 'SubCategory',
  type: 'document',
  fields: [
    {
      name: 'title', 
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }
  ],
}
