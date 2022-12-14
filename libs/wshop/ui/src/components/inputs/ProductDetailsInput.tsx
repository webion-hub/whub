import { Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { ProductDetail } from "@whub/wshop-api"
import { InputBaseProps, TextEditor, Utils, Validators } from "@whub/wui"
import { useEffect, useState } from "react"
import { ConfigUtils } from "../../lib/ConfigUtils"
import { ProductInput } from "../ProductInput"

export function ProductDetailsInput() {
  return (
    <ProductInput
      name="details"
      value={[]}
      getValidators={config => [
        ...ConfigUtils.getValidators(config, 'general'),
        Validators.min(config.required ? 1 : 0),
        Validators.customValidator((details: ProductDetail[]) => {
          return details.every(d => {
            const desc = Utils.stripHtml(d.description ?? '')
            return true &&
              Validators.required(d.title) &&
              Validators.validate(d.title, ConfigUtils.getValidators(config, 'title')) &&
              Validators.validate(desc, ConfigUtils.getValidators(config, 'description'))
          })
        })
      ]}
    >
      {
        (config, i) =>
          <ProductDetails
            {...i}
            required={config.required}
          />
      }
    </ProductInput>

  )
}

interface ProductDetailProps extends InputBaseProps<ProductDetail[]> {
  readonly required?: boolean
}

function ProductDetails(props: ProductDetailProps) {
  const [details, setDetails] = useState<ProductDetail[]>(props.value ?? [])

  const updateDetails = (details: ProductDetail[]) => {
    setDetails(details)
    props.onChange?.({ target: { value: details } })
  }

  const addDetails = () => {
    details.push({
      id: details.length,
      title: '',
      description: ''
    })

    updateDetails([...details])
  }

  const removeDetail = (id: number) => {
    const newDetails = details
      .filter(d => d.id !== id)
      .map((d, i) => ({ ...d, id: i }))

    updateDetails(newDetails)
  }

  const updateDetail = (newDetail: ProductDetail, id: number) => {
    const newDetails = details
      .map(d => {
        return d.id !== id
          ? d
          : newDetail
      })

    updateDetails(newDetails)
  }

  return (
    <Stack
      direction="column"
      component={Paper}
      spacing={1}
      sx={{
        padding: 1,
        borderColor: theme => props.error ? theme.palette.error.main : undefined
      }}
    >
      <Typography>
        Dettagli{props.required ? '*' : ''}
      </Typography>

      <Stack
        direction="column"
        spacing={1}
        sx={{
          maxHeight: 700,
          overflow: 'auto'
        }}
      >
        {
          details.map((d, i) => (
            <ProductDetailInput
              key={i}
              disabled={props.disabled}
              error={props.error}
              value={d}
              onChange={e => updateDetail(e.target.value, d.id)}
              onDelete={() => removeDetail(d.id)}
            />
          ))
        }
      </Stack>

      <Button
        variant="contained"
        onClick={() => addDetails()}
      >
        Aggiungi dettaglio
      </Button>
    </Stack>
  )
}


interface ProductDetailInputProps extends InputBaseProps<ProductDetail> {
  readonly onDelete: () => void
}

function ProductDetailInput(props: ProductDetailInputProps) {
  const [detail, setDetail] = useState<ProductDetail>(
    props.value ?? { id: -1, title: '', description: '' }
  )

  useEffect(() => {
    if(!props.value)
      return

    setDetail(props.value)
  }, [props.value])

  const setTitle = (title: string) => {
    const newDetail = {
      ...detail,
      title: title
    }

    setDetail(newDetail)
    props.onChange?.({ target: { value: newDetail } })
  }

  const setDescription = (description: string) => {
    const newDetail = {
      ...detail,
      description: description
    }

    setDetail(newDetail)
    props.onChange?.({ target: { value: newDetail } })
  }

  return (
    <Stack
      component={Paper}
      direction="column"
      sx={{ padding: 1 }}
      spacing={1}
    >
      <TextField
        disabled={props.disabled}
        error={props.error}
        size="small"
        required
        variant="outlined"
        label="Titolo"
        value={detail.title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextEditor
        disabled={props.disabled}
        error={props.error}
        label="Descrizione"
        maxCharacters={4096}
        value={detail.description}
        onChange={e => setDescription(e.target.value)}
      />
      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          color="secondary"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            props.onDelete()
          }}
        >
          Elimina
        </Button>
      </Stack>
    </Stack>
  )
}
