import { Box, Button, Typography } from '@mui/material'
import { Img, ResponserGrid } from '@whub/wui'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface ParagraphProps {
  readonly title: string,  
  readonly subTitle: string,
  readonly description: string,
  readonly primaryButtonLabel: string,
  readonly secondaryButtonLabel: string,
  readonly iconURL: string,
}

const Paragraph =  React.forwardRef<HTMLDivElement, ParagraphProps>((props, ref) => {
  const {t} = useTranslation()

  return (
    <ResponserGrid
      ref={ref}
      type="upper"
      size="md"
      reverse="column"
      sx={{
        marginBlock: 18,
        marginInline: 'auto',
        width: 1170,
        maxWidth: "100%",
        minHeight: "70vh",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      >
      <Box
        sx={{
          maxWidth: "95%",
          margin: "auto",
          justifyContent: { md: "center", lg: "left" },
        }}
        >
        <Typography
          color="text.secondary"
          variant="h1"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            textAlign: { md: "center", sm: "center", xs: "center", lg: "left" },
          }}
        >
          {t("title-bold")}
        </Typography>
        <Typography
          color="text.secondary"
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: { md: "center", sm: "center", xs: "center", lg: "left" },
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          color="text.primary"
          sx={{
            maxWidth: "600px",
            marginTop: { sm: 2, md: 3 },
            textAlign: { md: "center", sm: "center", xs: "center", lg: "left" },
          }}
        >
          {t("subtitle")}
        </Typography>
        <ResponserGrid
          type="upper"
          size="xs"
          GridProps={{
            justifyContent: {
              xs: "center",
              md: "space-between"
            }
          }}
          sx={{
            marginTop: 4,
            width: "100%",
          }}
        >
          <Button
            size="large"
            color="primary"
            variant="contained"
            href="/#about-us"
            onClick={() => (window.location.href = "/#AIDA")}
            sx={{
              textTransform: "capitalize",
              width: 260,
              paddingBlock: 1.5,
            }}
          >
            {t("main-button")}
          </Button>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            href="/#contacts"
            onClick={() => (window.location.href = "/#contacts")}
            sx={{
              textTransform: "capitalize",
              width: 260,
              marginTop: { xs: 2, sm: 0 },
              paddingBlock: 1.5, 
            }}
          >
            {t("contact-us-button")}
          </Button>
        </ResponserGrid>
      </Box>
      <Box sx={{ width: { xs: "40%", sm: "35%", md: "30%" } }}>
        <Img
          src="assets/images/homeIllustration.png"
          alt="study"
          sx={{ width: "100%", margin: "auto" }}
        />
      </Box>
    </ResponserGrid>
  )
})

export default Paragraph