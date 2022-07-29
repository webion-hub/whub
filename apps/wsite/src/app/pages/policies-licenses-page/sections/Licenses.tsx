import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Paragraph from "../../../components/text_boxes/Paragraph";

export default function Licenses() {
  const {t} = useTranslation()
  const [license, setLicense] = React.useState('');

  useEffect(() => {
    fetch('/license.txt').then(r => {
      r.text().then(text => {
        setLicense(text)
      })
    })
  }, [])

  return (
    <Paragraph
      title={t('licenses')}
    >
      <pre>
        <Typography
          variant="body1"
          color="textSecondary"
          whiteSpace="pre-wrap"
        >
          {license}
        </Typography>
      </pre>
    </Paragraph>
  )
}