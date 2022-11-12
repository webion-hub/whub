import { CallRounded, GitHub, LinkedIn } from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { ColorUtils } from 'libs/wui/src/lib/ColorUtils';
import { useEffect, useRef, useState } from 'react';
import { ImageAndDescription } from '../components/ImageAndDescription';
import { GetAQuoteSection } from '../components/sections/GetAQuote';

export default function WhoWeArePage() {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
    <Page>
      <Sections>
        <Section>
          <ImageAndDescription
            label={t('who-are-we')}
            title={t('who-are-we-title')}
            direction="row-reverse"
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
            description={t('who-are-we-description', true)}
          />
        </Section>
        <Section>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            flexWrap="wrap"
            sx={{
              width: '100%',
              maxWidth: 1200,
              marginBottom: 10,
              position: 'relative',
              '&::before': {
                content: `"${t('the-team')}"`,
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
            <Member
              name="Matteo Budriesi"
              memberRole={t('front-end-cofounder')}
              src="/assets/images/members/budda.png"
              videoSrc="/assets/videos/budda.webm"
              linkedinHref="https://www.linkedin.com/in/matteo-budriesi-b50b51218/"
              githubHref="https://github.com/matteo2437"
            />
            <Member
              name="Stefano Calabretti"
              memberRole={t('back-end-cofounder')}
              src="/assets/images/members/cala.png"
              videoSrc="/assets/videos/cala.webm"
              linkedinHref="https://www.linkedin.com/in/calabr/"
              githubHref="https://github.com/cala-br"
            />
            <Member
              name="Alessandro Dodi"
              memberRole={t('front-end-cofounder')}
              src="/assets/images/members/alle.png"
              videoSrc="/assets/videos/alle.webm"
              linkedinHref="https://www.linkedin.com/in/alessandro-dodi/"
              githubHref="https://github.com/AlessandroDodi"
            />
            <Member
              name="Davide Messori"
              memberRole={t('back-end')}
              src="/assets/images/members/davido.png"
              videoSrc="/assets/videos/davido.webm"
              linkedinHref="https://www.linkedin.com/in/davide-messori-282781189/"
              githubHref="https://github.com/davidemesso"
            />
          </Stack>
        </Section>
        <GetAQuoteSection sx={{ zIndex: 0 }} />
      </Sections>
    </Page>
  );
}

interface MemberProps {
  readonly name: string;
  readonly memberRole: string;
  readonly src: string;
  readonly videoSrc: string;
  readonly linkedinHref: string;
  readonly githubHref: string;
}

function Member(props: MemberProps) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    videoRef.current.currentTime = 0;

    hover ? videoRef.current.play() : videoRef.current.pause();
  }, [hover]);

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
      }}
    >
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
        sx={{
          zIndex: 1,
          width: 175,
          height: 175,
          position: 'relative',
          boxShadow: (theme) => theme.shadows[10],
          background: (theme) => theme.palette.primary.main,
          borderRadius: '100%',
          border: (theme) => `4px solid ${theme.palette.primary.main}`,
          overflow: 'hidden',
          '&:hover > .WUI-member--video': {
            opacity: '1 !important',
          },
          '&:hover > .WUI-member--avatar': {
            opacity: 0,
          },
        }}
      >
        <Box
          className="WUI-member--video"
          sx={{
            transition: '0.5s opacity',
            opacity: 0,
            position: 'absolute',
            background: '#000',
            width: '100%',
            height: '100%',
          }}
        >
          <video
            ref={videoRef}
            loop
            muted
            style={{
              height: '100%',
              width: '100%',
              transform: 'translateY(16px) scale(1.5)',
            }}
          >
            <source src={props.videoSrc} type="video/webm" />
          </video>
        </Box>

        <Avatar
          className="WUI-member--avatar"
          src={props.src}
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
        <IconButton href={props.linkedinHref} target="_blank">
          <LinkedIn />
        </IconButton>
        <IconButton href={props.githubHref} target="_blank">
          <GitHub />
        </IconButton>
      </Stack>
    </Stack>
  );
}
