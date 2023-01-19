import Head from 'next/head';
import { ReactNode } from 'react';
import useLanguage from '@wui/wrappers/useLanguage';

interface PageSettingsProps {
  readonly pageTranslationName: string;
  readonly children?: ReactNode;
}

export function PageSettings(props: PageSettingsProps) {
  const { children, pageTranslationName } = props;
  const { t } = useLanguage();

  return (
    <Head>
      <title>{t(`${pageTranslationName}-meta-title`)}</title>
      <meta
        content={t(`${pageTranslationName}-meta-description`)}
        name="description"
      />
      <meta
        content={t(`${pageTranslationName}-meta-description`)}
        property="og:title"
      />
      <meta
        content={t(`${pageTranslationName}-meta-description`)}
        property="og:description"
      />
      <meta
        content={t(`${pageTranslationName}-meta-title`)}
        property="twitter:title"
      />
      <meta
        content={t(`${pageTranslationName}-meta-description`)}
        property="twitter:description"
      />
      <meta property="og:type" content="website" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="keywords"
        content={t(`${pageTranslationName}-meta-keywords`)}
      />
      {children}
    </Head>
  );
}
