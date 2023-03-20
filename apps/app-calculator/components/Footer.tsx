import { Box, Button, Link, Stack, Typography } from "@mui/material";
import NextImg from "@wui/components/NextImg";
import BasicThemeButton from "@wui/components/BasicThemeButton";
import { pageMaxWidth } from "../pages/_app";
import { Section } from "./Section";

export function Footer() {
  return (
    <Box
      sx={{ 
        width: '100%',
        paddingInline: 4,
        background: theme => theme.palette.primary.main
      }}
    >
      <Section 
        sx={{ 
          paddingBlock: theme => theme.spacing(5, '!important'),
          maxWidth: pageMaxWidth
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row"}}
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                "& > *": {
                  color: '#fff !important'
                }
              }}
            >
              <BasicThemeButton/>
            </Box>
            <Button
              target="_blank"
              href="https://www.webion.it/"
              sx={{
                padding: 0.5,
                borderRadius: 1,
                width: 'fit-content',
              }}
            >
              <NextImg
                auto={{ height: '32px' }}
                alt="Webion-logo"
                src="/assets/images/logo.png"
                sx={{ objectFit: 'cover' }}
              />
            </Button>
          </Stack>

          <Stack
            direction="column"
            alignItems={{xs: "flex-start", sm: "flex-end"}}
            sx={{ paddingTop: { xs: 4, sm: 0 } }}
          >
            <Link
              href="https://www.webion.it"
              target="_blank"
            >
              <Typography 
                color="primary.contrastText"
                variant="caption"
              >
                Webion Srl
              </Typography>
            </Link>
            <Typography 
              color="primary.contrastText"
              variant="caption"
            >
              PIVA/CF IT04013210366
            </Typography>
            <Link
              href="https://www.webion.it/policies-licenses"
              target="_blank"
            >
              <Typography 
                color="primary.contrastText"
                variant="caption"
              >
                Privacy Policy
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Section>
    </Box>
  )
}