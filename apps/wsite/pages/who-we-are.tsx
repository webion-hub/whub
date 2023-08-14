import CallRounded from '@mui/icons-material/CallRounded';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';

import { alpha, Avatar, Box, Button, IconButton, Stack, SxProps, Theme, Typography } from '@mui/material';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import dynamic from 'next/dynamic';

import { ImageAndDescription } from '../components/blocks/ImageAndDescription';

const GetAQuote = dynamic(() => import("../components/sections/GetAQuote"), { ssr: true })

const membersOrder = [1, 2, 3]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

export default function WhoWeArePage() {
  const { t, tHtml } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
    <Page>
      <PageSettings pageTranslationName="about" />
      <Sections>
        <Section>
          <ImageAndDescription
            label={t('who-are-we')}
            title={t('who-are-we-title')}
            alt="who-we-are"
            direction="row"
            actionComponent={
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<CallRounded />}
                href="/contact-us"
                onClick={clickNavigate('/contact-us')}
              >
                {t('contact-us')}
              </Button>
            }
            imageComponent={
              <iframe
                title="webion-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.5635843217538!2d10.849022851792768!3d44.64683589552451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ff1f4a8694481%3A0xf83542b138453a23!2sWebion%20SRL!5e0!3m2!1sit!2sit!4v1663581265100!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
              ></iframe>
            }
            description={tHtml('who-are-we-description')}
          />
        </Section>
        <Section>
          <ImageAndDescription
            label={t('our-mission')}
            title={t('our-mission-title')}
            direction="row-reverse"
            src="/assets/images/group.jpg"
            alt="group"
            description={tHtml('our-mission-description')}
          />
        </Section>
        <Section>
          <Typography
            variant='h2'
            sx={{ 
              paddingBottom: 5,
              display: { xs: 'block', md: 'none' }
            }}
          >
            {t('the-team')}
          </Typography>
          <Stack
            direction="column"
            justifyContent="space-evenly"
            flexWrap="wrap"
            sx={{
              width: '100%',
              maxWidth: 1200,
              position: 'relative',
              '&::before': {
                content: { xs: '""', md: `"${t('the-team')}"` },
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(0px, 20vw, 500px)',
                fontWeight: 'bolder',
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? alpha('#000', 0.1)
                    : alpha('#fff', 0.08),
                whiteSpace: 'nowrap',
              },
              '& > *': { margin: 2 },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-evenly"
              flexWrap="wrap"
            >
              <Member
                name="Matteo Budriesi"
                memberRole={t('front-end-cofounder')}
                src="/assets/images/members/budda.jpg"
                alt="budda"
                linkedinHref="https://www.linkedin.com/in/matteo-budriesi-b50b51218/"
                githubHref="https://github.com/matteo2437"
                sx={{
                  order: membersOrder[0],
                }}
              />
              <Member
                name="Stefano Calabretti"
                memberRole={t('back-end-cofounder')}
                src="/assets/images/members/cala.jpg"
                alt="cala"
                linkedinHref="https://www.linkedin.com/in/calabr/"
                githubHref="https://github.com/cala-br"
                sx={{
                  order: membersOrder[1],
                }}
              />
              <Member
                name="Alessandro Dodi"
                memberRole={t('front-end-cofounder')}
                src="/assets/images/members/alle.jpg"
                alt="alle"
                linkedinHref="https://www.linkedin.com/in/alessandro-dodi/"
                githubHref="https://github.com/AlessandroDodi"
                sx={{
                  order: membersOrder[2],
                }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              flexWrap="wrap"
            >
              <Member
                name="Simone Leonelli"
                memberRole={t('sales-manager')}
                src="/assets/images/members/simo.jpeg"
                alt="mirco"
                linkedinHref='https://www.linkedin.com/in/simone-leonelli-1430871b3/'
              />
              <Member
                name="Davide Messori"
                memberRole={t('back-end')}
                src="/assets/images/members/davido.jpeg"
                linkedinHref="https://www.linkedin.com/in/davide-messori-282781189/"
                alt="davido"
                githubHref="https://github.com/davidemesso"
              />
              <Member
                name="Matteo Milanesi"
                memberRole={t('designer')}
                src="/assets/images/members/milanesi.jpeg"
                linkedinHref="https://www.linkedin.com/in/matteo-milanesi-b59734164/"
                alt="matteo milanesi"
              />
            </Stack>
          </Stack>
        </Section>
        <GetAQuote sx={{ zIndex: 0 }} />
      </Sections>
    </Page>
  );
}

interface MemberProps {
  readonly name: string;
  readonly memberRole: string;
  readonly src: string;
  readonly alt: string;
  readonly linkedinHref?: string;
  readonly githubHref?: string;
  readonly sx?: SxProps<Theme>;
}

function Member(props: MemberProps) {

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        maxWidth: 200,
        zIndex: 3,
        padding: 2,
        transition: '0.5s transform',
        borderRadius: 4,
        ...props.sx,
      }}
    >
      <Box
        sx={{
          zIndex: 1,
          width: 175,
          height: 175,
          position: 'relative',
          boxShadow: (theme) => theme.shadows[10],
          background: (theme) => theme.palette.primary.main,
          borderRadius: '100%',
          border: (theme) => `6px solid ${theme.palette.primary.main}`,
          overflow: 'hidden',
        }}
      >
        <Avatar
          className="WUI-member--avatar"
          src={props.src}
          alt={props.alt}
          sx={{
            transition: '0.5s opacity',
            opacity: 1,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      <Stack direction="column" alignItems="center" sx={{ zIndex: 1 }}>
        <Typography textAlign="center">{props.name}</Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          sx={{ width: '80%' }}
        >
          {props.memberRole}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {
          props.linkedinHref && 
            <IconButton
              href={props.linkedinHref}
              target="_blank"
              aria-label="See linkedin progile"
            >
              <LinkedIn />
            </IconButton>
        }
        {
          props.githubHref &&
            <IconButton
              href={props.githubHref}
              target="_blank"
              aria-label="See github progile"
            >
              <GitHub />
            </IconButton>
        }
      </Stack>
    </Stack>
  );
}
