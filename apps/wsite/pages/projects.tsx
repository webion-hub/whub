import {
  NextImg,
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';
import { CardGroup } from '../components/CardGroup';
import { ImageCard, ImageCardProps } from '../components/cards/ImageCard';
import { GetAQuoteSection } from '../components/sections/GetAQuote';

interface ProjectProps extends ImageCardProps {
  readonly src: string;
  readonly alt: string;
}

function Project(props: ProjectProps) {
  const { src, ...others } = props;

  return (
    <ImageCard
      {...others}
      img={
        <NextImg
          src={props.src}
          alt={props.alt}
          auto
          width="100%"
          sx={{
            borderRadius: (theme) => theme.shape.borderRadius,
          }}
        />
      }
    />
  );
}

export default function Projects() {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="project" />
      <Sections>
        <Section>
          <CardGroup
            label={t('projects')}
            title={t('our-most-recent-projects')}
          >
            <Project
              title="Kaire Automation"
              paragraph={t('kaire')}
              src="/assets/images/projects/kaire.webp"
              alt="kaire"
              onClick={() =>
                window.open('https://kaire-automation.it', '_blank')?.focus()
              }
              buttonLabel={t('see-website')}
            />
            <Project
              title="Simm Imballaggi"
              paragraph={t('simm')}
              src="/assets/images/projects/simm.png"
              alt="simm"
              onClick={() =>
                window
                  .open('https://shop.simmimballaggi.com', '_blank')
                  ?.focus()
              }
              onClickSecondary={clickNavigate('/studies/simm')}
              buttonLabel={t('see-website')}
              secondaryButtonLabel={t('learn-more')}
            />
            <Project
              title="Yoga Corfu Holidays"
              paragraph={t('yoga')}
              src="/assets/images/projects/yoga.webp"
              alt="yoga-corfu-holidays"
              onClick={() =>
                window
                  .open('https://www.yogacorfuholidays.com', '_blank')
                  ?.focus()
              }
              buttonLabel={t('see-website')}
            />
            <Project
              title="Mentorz"
              paragraph={t('mentorz')}
              src="/assets/images/projects/mentorz.png"
              alt="mentorz"
              onClick={() =>
                window
                  .open('https://mail.webion.it/sites/mentorz', '_blank')
                  ?.focus()
              }
              buttonLabel={t('see-website')}
            />
            <Project
              title="Massyve"
              paragraph={t('massyve')}
              src="/assets/images/projects/massyve.webp"
              alt="massyve"
              onClick={() =>
                window
                  .open('https://massyvemusic.design/massyve-landing', '_blank')
                  ?.focus()
              }
              buttonLabel={t('see-website')}
              onClickSecondary={clickNavigate('/studies/massyve')}
              secondaryButtonLabel={t('learn-more')}
            />
          </CardGroup>
        </Section>
        <GetAQuoteSection hideSecondaryBtn />
      </Sections>
    </Page>
  );
}
