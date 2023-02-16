import { Box, Button, Stack, Typography } from "@mui/material";
import { NextImg } from "@webion/ui-components";
import { useNextNavigator } from "@webion/ui-core";
import Section from "@webion/ui-layout/Section";
import { ISection } from "@webion/ui-sections";
import useLanguage from "@webion/ui-wrappers/useLanguage";

export interface CaseStudyLinkProps extends ISection {
  readonly title: string;
  readonly caseStudyTitle: string;
  readonly caseStudyDescription: string;
  readonly href: string;
  readonly src: string;
}

export function CaseStudyLink(props: CaseStudyLinkProps) {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
    <Section id={props.id}>
      <Stack direction="column" alignItems="center" sx={{ width: '80%' }}>
        <Typography variant="h3">{props.title}</Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignItems="stretch"
          sx={{
            width: '100%',
            marginTop: 4,
            '& > *': {
              padding: 1,
              width: '100%',
              maxWidth: 450,
            },
          }}
        >
          <NextImg
            src={props.src}
            alt={props.caseStudyTitle}
            fill
            skeletonSx={{ height: 'unset !important' }}
            sx={{
              objectFit: 'contain',
              position: 'relative !important',
              borderRadius: theme => theme.shape.borderRadius
            }}
          />
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">{props.caseStudyTitle}</Typography>
            <Typography>{props.caseStudyDescription}</Typography>
            <Box>
              <Button
                variant="contained"
                href={props.href}
                onClick={clickNavigate(props.href)}
              >
                {t('learn-more')}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Section>
  )
}
