import { NextImg } from '@wui/components';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
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
      skeletonvariant="circular"
      auto={{ width: '100%', height: '100%' }}
      sizes="100vw"
      sx={{ padding: 1.5 }}
    />
  )
}