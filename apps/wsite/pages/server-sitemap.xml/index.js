import { AppContext } from "@whub/apis-react";
import { getServerSideSitemap } from "next-sitemap";

export async function getServerSideProps(ctx) {
  const request = await AppContext
    .blogApi
    .articles
    .forLanguage('en')
    .filter();

  const newsSitemaps = request
    .data
    .map((item) => ({
      loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}blog/${item.webId.toString()}`,
      lastmod: new Date().toISOString(),
    }));

  const fields = [...newsSitemaps];
  return getServerSideSitemap(ctx, fields);
}

export default function SiteMap() {
  //
}
