
import { ClickableCard, MaybeShow, NextImg } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { CardGroup } from '../components/cards/CardGroup';
import { ImageCard, ImageCardProps } from '../components/cards/ImageCard';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
const GetAQuote = dynamic(() => import("../components/sections/GetAQuote"), { ssr: true })

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
          auto={{ height: '170px', width: '100%' }}
          sx={{
            objectFit: 'cover',
            borderRadius: (theme) => theme.shape.borderRadius/2,
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
      <Stack margin={"0 auto"}>
        <CardGroup
          label={t('projects')}
          title={""}
        >
        <ClickableCard sx={{width:"100%"}}>
          <Stack display="flex" flexDirection="row" gap={2} >
            <Box>
              <NextImg
                src="/assets/images/projects/qubi.png"
                alt="qubi"
                auto={{ height: '170px', width: '100%' }}
                sx={{
                  objectFit: 'cover',
                  borderRadius: (theme) => theme.shape.borderRadius/2,
                }}
              />
            </Box>
            <Stack
            direction="column"
            justifyContent="space-between"
            >
              <Box>
                <Typography variant="h5" component="h4" sx={{ marginBlock: 1 }}>
                  Qubi
                </Typography>
                <MaybeShow show={!!t("qubi")}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="span"
                  >
                    {t("qubi")}
                  </Typography>
                </MaybeShow>
              </Box>
              <Button
                onClick={()=>window.open('#', '_blank')?.focus()}
                variant='contained'
              >
                Vedi Sito Web
              </Button>
            </Stack>
          </Stack>
        </ClickableCard>
        </CardGroup>
      </Stack>
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
              title="Radio Bocconi"
              paragraph={t('bocconi')}
              src="/assets/images/projects/bocconi/bocconi.png"
              alt="bocconi"
              onClick={() =>
                window
                  .open(
                    'https://play.google.com/store/apps/details?id=com.devpier.bocconi_radio',
                    '_blank'
                  )
                  ?.focus()
              }
              buttonLabel={t('download-app')}
              onClickSecondary={clickNavigate('/studies/bocconi')}
              secondaryButtonLabel={t('learn-more')}
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
              onClickSecondary={clickNavigate('/studies/simm-imballaggi')}
              buttonLabel={t('see-website')}
              secondaryButtonLabel={t('learn-more')}
            />
            <Project
              title="Ciao Hearing"
              paragraph={t('ciaohearing')}
              src="/assets/images/projects/ciaohearing.png"
              alt="ciao-hearing"
              onClick={() =>
                window
                  .open('https://ciaohearing.it/', '_blank')
                  ?.focus()
              }
              buttonLabel={t('see-website')}
            />
            {/*<Project
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
            />*/}
            <Project
              title="Massyve"
              paragraph={t('massyve')}
              src="/assets/images/projects/massyve/massyve.webp"
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
            <Project
              title="Parva Domus"
              paragraph={t('parva-domus')}
              src="/assets/images/projects/parva-domus.png"
              alt="massyve"
              onClick={() =>
                window
                  .open('https://immobiliareparvadomus.com/', '_blank')
                  ?.focus()
              }
              buttonLabel={t('see-website')}
            />
          </CardGroup>
        </Section>
        <GetAQuote hideSecondaryBtn />
      </Sections>
    </Page>
  );
}
