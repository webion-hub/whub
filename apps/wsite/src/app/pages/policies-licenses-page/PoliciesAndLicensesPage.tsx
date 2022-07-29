import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, SxProps, Theme } from "@mui/material";
import CookiePolicy from "./sections/CookiePolicy";
import Licenses from "./sections/Licenses";
import PrivacyPolicy from "./sections/PrivacyPolicy";

import { ExpandMoreRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ChildrenProp } from "@whub/wui";

export default function PoliciesAndLicensesPage() {
  const { t } = useTranslation() 

  return (
    <Box
      sx={{
        padding: 4,
        paddingTop: 20,
        minHeight: "68vh",
      }}
    >
      <Typography variant="h3" sx={{marginBlock: 4}}>
        {t('policies')}
      </Typography>
      <SimpleAccordion title="Privacy Policy" sx={{marginBottom: 2}}>
        <PrivacyPolicy/>
      </SimpleAccordion>
      <SimpleAccordion title="Cookie Policy" sx={{marginBlock: 2}}>
        <CookiePolicy/>
      </SimpleAccordion>
      <SimpleAccordion title={t('licenses')} sx={{marginBlock: 2}}>
        <Licenses/>
      </SimpleAccordion>
    </Box>
  )
}

export interface SimpleAccordionProps {
  readonly title: string,
  readonly children: ChildrenProp,
  readonly sx: SxProps<Theme>,
}

function SimpleAccordion(props: SimpleAccordionProps) {
  return (
    <Accordion
      sx={props.sx}  
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
      >
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  )
}