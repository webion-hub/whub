import { Checkbox, Grid, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { InputBaseProps } from "@whub/wui";
import React from "react";
import { useTranslation } from "react-i18next";


const PrivacyCheckBox = React.forwardRef<HTMLDivElement, InputBaseProps<boolean>>((props, ref) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const getTextColor = () => {
    return props.error
      ? "red"
      : theme.palette['info'].main
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.({
      target: {
        value: e.target.checked,
      },
    })
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      ref={ref}
    >
      <Checkbox
        disabled={props.disabled}
        sx={{
          color: getTextColor() + " !important",
          '&.Mui-checked': {
            color: "secondary",
          },
        }}
        onChange={handleChange}
        checked={props.value}
      />
      <Typography
        variant="caption"
        color={getTextColor()}
        sx={{
          width: "calc(100% - 42px)",
        }}
      >
        {t('privacy')}
        <Link
          color="inherit"
          sx={{cursor: "pointer"}}
          onClick={(e) => {
            e.stopPropagation()
            window.open("/policies-licenses", '_blank')?.focus()
          }}
        >
          {t('privacy-link')}
        </Link>
      </Typography>
    </Grid>
  )
})

export default PrivacyCheckBox
