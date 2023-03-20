import { Box, Paper } from "@mui/material";
import NextImg from "@wui/components/NextImg";
import { Section } from "./Section";

export function Appbar() {
  return (
    <Box
      sx={{
        paddingInline: 4
      }}
    >
      <Section id="background">
        <Paper
          sx={{
            width: '100%',
            height: 250,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <NextImg
            fill
            alt="background"
            src="/assets/images/background.jpeg"
            sx={{ objectFit: 'cover' }}
          />
        </Paper>
      </Section>
    </Box>
  )
}