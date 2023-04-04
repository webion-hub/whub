import Editor from "@monaco-editor/react";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { LoadingButton } from '@mui/lab';
import { Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from "@mui/system";
import Section from "@wui/layout/Section";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";

const maxSheetWidth = 710

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
      .post('pdf', { html })
      .then(res => downloadBase64Pdf(res.data.pdf, 'Wpdf.pdf'))
      .finally(() => setLoading(false))
  }

  function downloadBase64Pdf(base64String: string, fileName: string): void {
    const linkSource = `data:application/pdf;base64,${base64String}`;
    const downloadLink = document.createElement("a");
    const fileNameWithExt = `${fileName}.pdf`;
  
    downloadLink.href = linkSource;
    downloadLink.download = fileNameWithExt;
    downloadLink.click();
  }

  return (
    <Section>
      <Grid
        container
        spacing={2}
        sx={{ 
          width: '100%' 
        }}
      >
        <Grid xs={12} lg={6}>
          <Paper 
            sx={{
              minHeight: 400,
              display: 'flex',
              height: '100%',
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
        <Grid xs={12} lg={6}>
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
              srcDoc={html}
            />
          </Paper>
        </Grid>
      </Grid>
      <LoadingButton
        loading={loading}
        variant="contained"
        sx={{ marginTop: 2 }}
        endIcon={<DownloadRoundedIcon/>}
        onClick={download}
      >
        Download
      </LoadingButton>
    </Section>
  )
}
