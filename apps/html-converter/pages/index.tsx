import Editor from "@monaco-editor/react";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from "@mui/system";
import Section from "@wui/layout/Section";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const maxSheetWidth = 795

export default function Homepage() {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [html, setHtml] = useState('')
  const [scale, setScale] = useState(1)

  const containerRef = useRef<any>()

  useEffect(() => {
    updateScale()

    const sub = fromEvent(window, 'resize')
      .subscribe(() => updateScale())

    return () => sub.unsubscribe()
  }, [containerRef])


  const updateScale = () => {
    const container = (containerRef.current as HTMLElement)
    container.style.height = `${(container.getBoundingClientRect().width / 210) * 297}px`

    setScale(
      container.getBoundingClientRect().width / 
      maxSheetWidth
    )
  }

  const download = () => {
    setLoading(true)
    axios
      .create({
        baseURL: '/api',
      })
      .post('pdf', { html: preparedHtml })
      .then(res => openPreview(res.data.pdf, 'Wpdf.pdf'))
      .finally(() => setLoading(false))
  }

  const openPreview = (base64String: string, fileName: string) => {
    fetch(`data:application/pdf;base64,${base64String}`)
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => window.open(url))
  }

  const copy = () => {
    navigator.clipboard.writeText(preparedHtml);
  }

  const preparedHtml = `
    <html>
      ${html}
    </html>
  `

  return (
    <Section>
      <Grid
        container
        spacing={2}
        sx={{ 
          width: '100%' 
        }}
      >
        <Grid xs={12} md={6}>
          <Paper 
            sx={{
              display: 'flex',
              height: { xs: 400, lg: '100%' },
              borderRadius: 1,
              overflow: 'hidden',
              width: '100%',
              "& > *": {
                maxWidth: '100% !important',
              }
            }}
          >
            <Editor
              theme={theme.palette.mode === 'dark' ? "vs-dark" : "vs-light"}
              width="100%"
              height="100%"
              defaultLanguage="html"
              value={html}
              onChange={e => setHtml(e ?? '')}
              options={{ minimap: { enabled: false } }}
            />
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper
            ref={containerRef}
            sx={{
              borderRadius: 1,
              background: 'white',
              width: '100%',
              height: 'fit-content',
              aspectRatio: '210/297'
            }}
          >
            <iframe
              style={{
                overflow: 'overlay',
                display: 'block',
                border: 'none',
                transformOrigin: 'top left',
                transform: `scale(${scale})`,
                width: maxSheetWidth,
                height: 'fit-content',
                aspectRatio: '210/297'
              }}
              srcDoc={preparedHtml}
            />
          </Paper>
        </Grid>
      </Grid>
      <Stack
        direction={{ xs: 'column', md: 'row'  }}
        spacing={2}
        sx={{ marginTop: 2 }}
      >
        <Button
          variant="outlined"
          endIcon={<ContentCopyRoundedIcon/>}
          onClick={copy}
        >
          Copia HTML
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          endIcon={<DownloadRoundedIcon/>}
          onClick={download}
        >
          Download
        </LoadingButton>
      </Stack>
    </Section>
  )
}
