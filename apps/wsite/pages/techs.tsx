import { NextImg } from '@webion/ui-components';
import Page from '@webion/ui-layout/Page';
import PageSettings from '@webion/ui-layout/PageSettings';
import Section from '@webion/ui-layout/Section';
import Sections from '@webion/ui-layout/Sections';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { CardGroup } from '../components/cards/CardGroup';
import { IconCard } from '../components/cards/IconCard';


const GetAQuote = dynamic(() => import("../components/sections/GetAQuote"), { ssr: true })

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
                <TechImg
                  alt="c-sharp"
                  src="/assets/images/technologies/c-sharp.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="C#"
              paragraph={t('c#')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="next-js"
                  src="/assets/images/technologies/next-js.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="Next JS"
              paragraph={t('next-js')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="flutter"
                  src="/assets/images/technologies/flutter.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="Flutter"
              paragraph={t('flutter')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="docker"
                  src="/assets/images/technologies/docker.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="Docker"
              paragraph={t('docker')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="react"
                  src="/assets/images/technologies/react.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="React"
              paragraph={t('react')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="net-core"
                  src="/assets/images/technologies/net-core.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="NET Core"
              paragraph={t('net-core')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="angular"
                  src="/assets/images/technologies/angular.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="Angular"
              paragraph={t('angular')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="sql"
                  src="/assets/images/technologies/sql.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="SQL"
              paragraph={t('sql')}
            />
            <IconCard
              icon={
                <TechImg
                  alt="mongo db"
                  src="/assets/images/technologies/mongo-db.svg"
                />
              }
              iconBackgroundColor="#fff"
              title="Mongo DB"
              paragraph={t('mongo-db')}
            />
          </CardGroup>
        </Section>
        <GetAQuote />
      </Sections>
    </Page>
  );
}


interface TechImgProps {
  readonly alt: string,
  readonly src: string,
}

function TechImg(props: TechImgProps) {
  return (
    <NextImg
      {...props}
      skeletonVariant="circular"
      auto={{ width: '100%' }}
      skeletonSx={{ height: '100% !important' }}
      sizes="100vw"
      sx={{ padding: 1.5 }}
    />
  )
}