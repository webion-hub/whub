import { Box, Stack, Typography } from "@mui/material";
import { useOnScreen } from "@wui/core";
import Section from "@wui/layout/Section";
import { ISection } from "@wui/sections";
import { useLanguage } from "@wui/wrappers";
import { useRef } from "react";
import { Step } from "../cards/Step";

export default function OurProcess(props: ISection) {
  const ref = useRef();
  const { t } = useLanguage();
  const onScreen = useOnScreen(ref, {
    oneTime: true,
    observeOptions: {
      rootMargin: '-10% 0% -10% 0%',
    },
  });

  return (
    <Section id={props.id}>
      <Box
        ref={ref}
        sx={{
          marginInline: 'auto',
          width: '100%',
          maxWidth: '100%',
          marginBlock: 4,
          zIndex: '2 !important',
        }}
      >
        <Typography
          color="text.primary"
          variant="h2"
          sx={{ textAlign: 'center' }}
        >
          {t('process')}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ '& > *': { margin: 4 } }}
        >
          <Step
            in={onScreen}
            delay={0}
            step="01"
            title={t('process1-title')}
            description={t('process1-desc')}
          />
          <Step
            in={onScreen}
            delay={300}
            step="02"
            title={t('process2-title')}
            description={t('process2-desc')}
          />
          <Step
            in={onScreen}
            delay={600}
            step="03"
            title={t('process3-title')}
            description={t('process3-desc')}
          />
          <Step
            in={onScreen}
            delay={900}
            step="04"
            title={t('process4-title')}
            description={t('process4-desc')}
          />
        </Stack>
      </Box>
    </Section>
  );
}
