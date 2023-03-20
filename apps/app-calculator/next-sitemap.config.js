const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  exclude: [
    '/email'
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
    ],
  },
};
