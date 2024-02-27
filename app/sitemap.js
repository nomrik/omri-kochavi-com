 export default function sitemap() {
  return [
    {
      url: 'https://omrikochavi.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://omrikochavi.com.com/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://omrikochavi.com.com/works',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
        url: 'https://omrikochavi.com.com/contact',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
  ]
}