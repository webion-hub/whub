import { CallRounded } from '@mui/icons-material';
import { Avatar, Button, Paper, Stack, Typography } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
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
              maxWidth: 900,
              marginBottom: 10,
              '& > *': { margin: 2 },
            }}
          >
            <Member
              name="Matteo Budriesi"
              memberRole="Frontend Developer"
              src=""
            />
            <Member
              name="Stefano Calabretti"
              memberRole="Backend Developer"
              src=""
            />
            <Member name="Alessandro Dodi" memberRole="Designer" src="" />
          </Stack>
        </Section>
        <GetAQuoteSection />
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
    <Stack direction="column" alignItems="center" spacing={2}>
      <Avatar src={props.src} sx={{ width: 150, height: 150 }} />
      <Stack direction="column">
        <Typography textAlign="center">{props.name}</Typography>
        <Typography variant="caption" textAlign="center" color="text.secondary">
          {props.memberRole}
        </Typography>
      </Stack>
    </Stack>
  );
}
