import { Typography } from '@mui/material';
import { Paragraph } from '@wui/components';
import useLanguage from '@wui/wrappers/useLanguage';
import React, { useEffect } from 'react';

export default function Licenses() {
  const { t } = useLanguage();
  const [license, setLicense] = React.useState('');

  useEffect(() => {
    fetch('license.txt').then((r) => {
      r.text().then((text) => {
        setLicense(text);
      });
    });
  }, []);

  return (
    <Paragraph title={t('licenses')}>
      <pre>
        <Typography variant="body1" color="textSecondary" whiteSpace="pre-wrap">
          {license}
        </Typography>
      </pre>
    </Paragraph>
  );
}
