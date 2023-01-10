import { AppContext } from "@whub/apis-react";
import { getServerSideSitemap } from "next-sitemap";

export async function getServerSideProps(ctx) {
  const request = await AppContext
    .blogApi
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
