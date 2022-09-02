import { Checkbox, FormControlLabel, Grid, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { InputBaseProps } from "../../abstractions/form/InputBaseProps";


export interface PrivacyCheckBoxProps extends InputBaseProps<boolean> {
  readonly privacyUrl: string
}

export const PrivacyCheckBox = React.forwardRef<HTMLDivElement, PrivacyCheckBoxProps>((props, ref) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const getTextColor = () => {
    return props.error
      ? "red"
      : theme.palette['secondary'].main
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.({
      target: {
        value: e.target.checked,
      },
    })
  }

  return (
    <FormControlLabel
      disabled={props.disabled}
      control={
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
      } 
      label={
        <Typography
          variant="caption"
          color={getTextColor()}
          sx={{
            width: "calc(100% - 42px)",
          }}
        >
          {t('privacy')}
          <Link
            href={props.privacyUrl}
            target="_blank"
            color="inherit"
          >
            {t('privacy-link')}
          </Link>
        </Typography>
      }
    />
  )
})

