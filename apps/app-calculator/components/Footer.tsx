import { Box, Button, Link, Stack, Typography } from "@mui/material";
import NextImg from "@wui/components/NextImg";
import { pageMaxWidth } from "../pages/_app";
import { Section } from "./Section";

export function Footer() {
  return (
    <Box
      sx={{ 
        width: '100%',
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
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >

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

          <Stack
            direction="column"
            alignItems="flex-end"
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