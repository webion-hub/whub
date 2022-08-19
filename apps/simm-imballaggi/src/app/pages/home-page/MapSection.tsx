import { Box, Button, Grid, Stack, styled, Typography } from "@mui/material";
import { ResponserGrid } from "@whub/wui";
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { useTranslation } from "react-i18next";
import ContactsDialog from "../../components/dialogs/ContactsDialog";
import { useState } from "react";

const StyledMap = styled('iframe')(() => ({
  borderRadius: 8,
  border: 0,
}))

export default function MapSection() {
  const [openContacts, setOpenContact] = useState<boolean>(false)

  const { t } = useTranslation(); 
  return (
    <Stack
      direction="column"
    >
      <ResponserGrid
        type="upper"
        size="lg"
        GridProps={{
          justifyContent: "center",
          alignItems: "center",
          sx: {
            paddingInline: {xs: 4, md: 12},
            paddingBlock: 3
          }
        }}
      >
        <Box
          sx={{
            width: {xs: "100%", lg: "40%" },
            marginRight: {xs: 0, lg: 4 },
            marginBottom: {xs: 4, lg: 0 },
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
          >
            {t("who-are-we")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 2,
              textAlign: {xs: "justify", md: "left"}
            }}
          >
            {t("contact-us-description-p1")}<br/><br/>
            {t("contact-us-description-p2")}<br/><br/>
            {t("contact-us-description-p3")}<br/><br/>
            {t("contact-us-description-p4")}<br/><br/>
          </Typography>
        </Box>
        <Grid
          container
          direction="column"
          sx={{width: {xs: "100%", lg: 'auto'}}}
        >
          <StyledMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.025110535519!2d11.4109574157301!3d44.535118402972245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477e2ce4005a1bf3%3A0x93f774b37f64da61!2sVia%20Gian%20Luigi%20Lazzari%2C%2018%2C%2040057%20Quarto%20Inferiore%20BO!5e0!3m2!1sit!2sit!4v1660216784064!5m2!1sit!2sit"
            sx={{
              width: {xs: '100%', lg: 600},
              height: {xs: 225, lg: 450},
            }}
          />
          <Typography
            variant="caption"
            textAlign="center"
            color="secondary"
          >
            {t("address-link")}
          </Typography>
        </Grid>
      </ResponserGrid>
      <Button
        variant='contained'
        onClick={() => setOpenContact(true)}
        sx={{
          margin: 'auto'
        }}
        startIcon={<CallRoundedIcon/>}
      >
        {t("contact-us-button")}
      </Button>
      <ContactsDialog
        open={openContacts}
        onClose={() => setOpenContact(false)}
      />
    </Stack>
  )
}
