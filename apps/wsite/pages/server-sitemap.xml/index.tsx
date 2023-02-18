import ApiFactory from '../../lib/ApiFactory';
import { getServerSideSitemap } from "next-sitemap";

export async function getServerSideProps(ctx: any) {
  const request = await ApiFactory
    .blog
    .sitemap
    .load();

  const newsSitemaps = request
    .data
    .map((item) => ({
      lastmod: new Date().toISOString(),
      loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${item.language}/blog/${item.webId.toString()}`,
    }));

  const fields = [...newsSitemaps];
  return getServerSideSitemap(ctx, fields);
}

export default function SiteMap() {
  //
}
