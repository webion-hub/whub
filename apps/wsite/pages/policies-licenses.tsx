import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';

import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

import { useLanguage } from '@wui/wrappers';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import PrivacyPolicy from '../components/sections/policies-sections/PrivacyPolicy';
import CookiePolicy from '../components/sections/policies-sections/CookiePolicy';
import Licenses from '../components/sections/policies-sections/Licenses';
import { ChildrenProp } from '@wui/core';


export default function PoliciesLicenses() {
  const { t } = useLanguage();

  return (
    <Page>
      <Section>
        <Box
          sx={{
            padding: 4,
            minHeight: '68vh',
          }}
        >
          <Typography variant="h3" sx={{ marginBlock: 4 }}>
            {t('policies')}
          </Typography>
          <SimpleAccordion title="Privacy Policy" sx={{ marginBottom: 2 }}>
            <PrivacyPolicy />
          </SimpleAccordion>
          <SimpleAccordion title="Cookie Policy" sx={{ marginBlock: 2 }}>
            <CookiePolicy />
          </SimpleAccordion>
          <SimpleAccordion title={t('licenses')} sx={{ marginBlock: 2 }}>
            <Licenses />
          </SimpleAccordion>
        </Box>
      </Section>
    </Page>
  );
}

export interface SimpleAccordionProps {
  readonly title: string;
  readonly children: ChildrenProp;
  readonly sx: SxProps<Theme>;
}

function SimpleAccordion(props: SimpleAccordionProps) {
  return (
    <Accordion
      sx={props.sx}
      TransitionProps={{
        timeout: 200,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
