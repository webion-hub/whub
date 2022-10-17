import { CloseRounded } from "@mui/icons-material"
import { Button, Divider, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from "@mui/material"
import { MaybeShow, useSet, Validators } from "@whub/wui"
import React, { useEffect, useRef, useState } from "react"
import { ConfigUtils } from "../../lib/ConfigUtils"
import { ProductInput } from "../ProductInput"

export function ProductVideosInput() {
  return (
    <ProductInput
      name="videos"
      value={[]}
      getValidators={config => [
        Validators.min(config.required ? 1 :0),
        ...ConfigUtils.getValidators(config, 'general')
      ]}
    >
      {
        (config, i) => (
          <ProductVideosAdder
            required={config.required}
            videos={i.value ?? []}
            onChange={videos => i.onChange?.({ target: { value: videos } })}
          />
        )
      }
    </ProductInput>
  )
}


interface ProductVideosAdderProps {
  readonly required?: boolean;
  readonly videos: string[],
  readonly onChange: (videos: string[]) => void
}

function ProductVideosAdder(props: ProductVideosAdderProps) {
  const {
    add,
    remove,
    values,
    set
  } = useSet<string>(props.videos)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const videos = Array.from(values() ?? [])
  const refFirstRender = useRef(true);

  useEffect(() => {
    if(refFirstRender.current) {
      refFirstRender.current = false
      return
    }

    props.onChange(videos)
  }, [set])

  return (
    <Paper sx={{ padding: 1 }}>
      <Typography>
        {`Video${props.required ? '*' : ''}`}
      </Typography>
      <Stack
        direction="column"
        spacing={1}
        sx={{ width: '100%', marginTop: 1 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ width: '100%' }}
        >
          <TextField
            size="small"
            error={error}
            variant="outlined"
            label="Video iframe"
            fullWidth
            value={value}
            onChange={e => {
              setValue(e.target.value)
              setError(false)
            }}
          />
          <Button
            size="small"
            variant="contained"
            sx={{ paddingInline: 2 }}
            onClick={() => {
              const isIFrame = /(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/.test(value)

              if(!isIFrame) {
                setError(true)
                return
              }

              add(value)
              setValue('')
            }}
          >
            Aggiungi
          </Button>
        </Stack>
        <List sx={{ padding: 0 }}>
          {
            videos
              .map((v, i) => (
                <React.Fragment key={i}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={() => remove(v)}
                      >
                        <CloseRounded/>
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`Video-${i + 1}`}/>
                  </ListItem>
                  <MaybeShow
                    show={i !==  videos.length - 1}
                  >
                    <Divider />
                  </MaybeShow>
                </React.Fragment>
              ))
          }
        </List>
      </Stack>
    </Paper>
  )
}
