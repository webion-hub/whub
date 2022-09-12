import { AppShortcutRounded, DevicesRounded, FactoryRounded } from "@mui/icons-material";
import { alpha, Box, Button, Card, CardActions, CardContent, Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ResponserGrid, WuiGrid } from "@whub/wui";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  readonly Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>,
  readonly title: string,
  readonly paragraph: string
}

function ServiceCard(props: ServiceCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 390,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 64,
            margin: 1,
            aspectRatio: '1',
            borderRadius: '100%',
            background: theme => alpha(theme.palette.primary.main, 0.4)
          }}
        >
          <props.Icon fontSize="large"/>
        </Stack>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.paragraph}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default function Services() {
  const { t } = useTranslation();

  return (
    <Box sx={{
      marginTop: 5,
      marginInline: 'auto',
      width: "95%",
    }}>
      <Typography
        color="text.primary"
        variant="h2"
        sx={{ textAlign: "center" }}
      >
        {t("services-title")}
      </Typography>
      <ResponserGrid
        type="upper"
        size="md"
        GridProps={{
          flexWrap: 'wrap'
        }}
        sx={{
          justifyContent: "center",
          width: "fit-content",
          maxWidth: "100%",
          alignContent: "center",
          alignItems: "stretch",
          marginInline: 'auto',
          marginBlock: 6,
          "& > *": {margin: 1},
        }}
      >
        <ServiceCard
          title={t("services-service-1-title")}
          paragraph={t("services-service-1-description")}
          Icon={DevicesRounded}
        />
        <ServiceCard
          title={t("services-service-2-title")}
          paragraph={t("services-service-2-description")}
          Icon={AppShortcutRounded}
         />
        <ServiceCard
          title={t("services-service-3-title")}
          paragraph={t("services-service-3-description")}
          Icon={FactoryRounded}
        />
      </ResponserGrid>
      <WuiGrid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Button
          variant="contained"
          href="/#contacts"
          size="large"
          onClick={() => (window.location.href = "/#contacts")}
          sx={{
            textTransform: 'none',
            textAlign: "center",
          }}
        >
          {t("services-consultation")}
        </Button>
      </WuiGrid>
    </Box>
  );
}
