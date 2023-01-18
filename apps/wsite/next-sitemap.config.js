const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  exclude: [
    '/blog/create-article',
    '/message/error',
    '/message/sent'
  ],
  changefreq: 'daily',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
    ],
  },
};
