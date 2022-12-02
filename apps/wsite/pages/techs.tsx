import { NextImg, Page, Section, Sections, useLanguage } from '@whub/wui';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';
import { CardGroup } from '../components/CardGroup';
import { IconCard } from '../components/cards/IconCard';
import { GetAQuoteSection } from '../components/sections/GetAQuote';

export default function Techs() {
  const { t } = useLanguage();
  return (
    <Page>
      <PageSettings pageTranslationName="techs" />
      <Sections>
        <Section>
          <CardGroup label={t('technologies')} title={t('technologies-title')}>
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="c-sharp"
                  src="/assets/images/technologies/c-sharp.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="C#"
              paragraph={t('c#')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="next-js"
                  src="/assets/images/technologies/next-js.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Next JS"
              paragraph={t('next-js')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="flutter"
                  src="/assets/images/technologies/flutter.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Flutter"
              paragraph={t('flutter')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="docker"
                  src="/assets/images/technologies/docker.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Docker"
              paragraph={t('docker')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="react"
                  src="/assets/images/technologies/react.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="React"
              paragraph={t('react')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="net-core"
                  src="/assets/images/technologies/net-core.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="NET Core"
              paragraph={t('net-core')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="angular"
                  src="/assets/images/technologies/angular.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Angular"
              paragraph={t('angular')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="sql"
                  src="/assets/images/technologies/sql.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="SQL"
              paragraph={t('sql')}
            />
            <IconCard
              icon={
                <NextImg
                  auto
                  width="100%"
                  sizes="100vw"
                  alt="mongo db"
                  src="/assets/images/technologies/mongo-db.svg"
                  sx={{ padding: 1.5 }}
                />
              }
              iconBackgroundColor="#fff"
              title="Mongo DB"
              paragraph={t('mongo-db')}
            />
          </CardGroup>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
