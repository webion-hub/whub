import { Checkbox, FormControlLabel, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { InputBaseProps } from '@wui/form';
import useLanguage from '@wui/wrappers/useLanguage';
import React from 'react';


export interface PrivacyCheckboxProps extends InputBaseProps<boolean> {
  readonly privacyUrl: string;
  readonly color?: string;
}

export const PrivacyCheckbox = React.forwardRef<
  HTMLDivElement,
  PrivacyCheckboxProps
>((props, ref) => {
  const theme = useTheme();
  const { t } = useLanguage();

  const getTextColor = () => {
    return props.error ? 'red' : props.color ?? theme.palette['secondary'].main;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.({
      target: {
        value: e.target.checked,
      },
    });
  };

  return (
    <FormControlLabel
      disabled={props.disabled}
      control={
        <Checkbox
          disabled={props.disabled}
          sx={{
            color: getTextColor() + ' !important',
            '&.Mui-checked': {
              color: 'secondary',
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
            width: 'calc(100% - 42px)',
          }}
        >
          {t('privacy')}
          <Link href={props.privacyUrl} target="_blank" color="inherit">
            {t('privacy-link')}
          </Link>
        </Typography>
      }
    />
  );
});

PrivacyCheckbox.displayName = 'PrivacyCheckbox'