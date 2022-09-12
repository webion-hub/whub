import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material"
import { handleResponse } from "@whub/apis-core"
import { useShopApi } from "@whub/apis-react"
import { Category } from "@whub/wshop-api"
import { DialogBase, DialogTitleCross } from "@whub/wui"
import { useState } from "react"

export interface CreateCategoryDialogProps extends DialogBase {
  readonly onCreate?: (category: Category) => void
}

export function CreateCategoryDialog(props: CreateCategoryDialogProps) {
  const shopApi = useShopApi()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onClose = () => {
    if(loading)
      return

    props.onClose()
  }

  const onCreate = () => {
    setLoading(true)
    setError(false)

    shopApi.categories
      .create({ name })
      .then(res => handleResponse(res, {
        "201": () => {
          props.onCreate?.(res.data)
          props.onClose()
        },
        "409": () => setError(true)
      }))
      .finally(() => setLoading(false))
  }

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
      maxWidth='xs'
      PaperProps={{ sx: { width: '100%' } }}
    >
      <DialogTitleCross
        onClose={onClose}
        disabled={loading}
      >
        Crea categoria
      </DialogTitleCross>
      <DialogContent>
        <TextField
          sx={{ marginTop: 1 }}
          fullWidth
          size="small"
          variant="outlined"
          label="Nome categoria"
          color="secondary"
          helperText={error && "Categoria già esistente."}
          disabled={loading}
          error={error}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={onClose}
          disabled={loading}
        >
          Chiudi
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          onClick={onCreate}
          loading={loading}
        >
          Crea
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
