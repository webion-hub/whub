import { CallRounded } from '@mui/icons-material';
import { alpha, Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { ColorUtils } from 'libs/wui/src/lib/ColorUtils';
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
                width="600"
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
                content: "'Il team'",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(0px, 30vw, 550px)',
                fontWeight: 'bolder',
                color: theme => theme.palette.mode === 'light'
                  ? alpha('#000', 0.1)
                  : alpha('#fff', 0.08),
                whiteSpace: 'nowrap'
              },
              '& > *': { margin: 2 },
            }}
          >
            <Member
              name="Matteo Budriesi"
              memberRole="Co-Founder & Frontend Developer"
              src="/assets/images/members/budda.png"
            />
            <Member
              name="Stefano Calabretti"
              memberRole="Co-Founder & Backend Developer"
              src="/assets/images/members/cala.png"
            />
            <Member
              name="Alessandro Dodi"
              memberRole="Co-Founder & Frontend Developer"
              src="/assets/images/members/alle.png"
            />
            <Member
              name="Davide Messori"
              memberRole="Backend Developer"
              src="/assets/images/members/davido.png"
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
}

function Member(props: MemberProps) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        zIndex: 3,
        maxWidth: 200,
        padding: 2,
        transition: '0.25s background, 0.5s transform',
        borderRadius: 4,
      }}
    >
      <Avatar
        src={props.src}
        sx={{
          zIndex: 1,
          width: 175,
          height: 175,
          position: 'relative',
          boxShadow: theme => theme.shadows[10],
          border: theme => `4px solid ${theme.palette.primary.main}`
        }}
      />
      <Stack
        direction="column"
        alignItems="center"
        sx={{ zIndex: 1 }}
      >
        <Typography textAlign="center">{props.name}</Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          sx={{ width: '70%' }}
        >
          {props.memberRole}
        </Typography>
      </Stack>
    </Stack>
  );
}
