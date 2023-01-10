import Head from 'next/head';

interface HeadMetaProps {
  readonly title: string;
}

export default function HeadMeta(props: HeadMetaProps) {
  return (
    <Head>
      <meta content={props.title} name="description" />
      <meta content={props.title} property="og:title" />
      <meta content={props.title} property="og:description" />
      <meta content={props.title} property="twitter:title" />
      <meta content={props.title} property="twitter:description" />
      <meta property="og:type" content="website" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="keywords" content={props.title} />
    </Head>
  );
}
