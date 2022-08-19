import { AddRounded } from "@mui/icons-material";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, Divider, Stack, TextField, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DialogTitleCross, Page, SquareAddAttachment, SquareAddImage, SquareContainer, SquareImageContainer, SquaresGrid, Utils } from "@whub/wui";
import { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function TableProductsPage() {
  return (
    <Page sx={{ padding: 1 }}>
      <Stack
        direction="column"
        spacing={1}
      >
        <Stack
          direction="row"
          spacing={1}
        >
          <TextField
            variant="outlined"
            label="Cerca prodotto"
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<AddRounded/>}
            size="small"
            sx={{ minWidth: 240 }}
          >
            Aggiungi prodotto
          </Button>
        </Stack>
      </Stack>
      <AddEditProduct/>
    </Page>
  )
}


interface FileWithId<T> {
  readonly id: number,
  readonly file: T,
}

function AddEditProduct() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [images, setImages] = useState<FileWithId<string>[]>([])
  const [pdfs, setPdfs] = useState<FileWithId<File>[]>([])

  const addFile = <T,>(file: T, list: FileWithId<T>[]) => {
    list.push({
      file: file,
      id: list.length
    })

    return [...list]
  }

  const removeFile = <T,>(img: FileWithId<T>, list: FileWithId<T>[]) => {
    return list
      .filter(i => i.id !== img.id)
      .map((i, k) => ({ ...i, id: k }))
  }

  return (
    <Dialog
      open
      fullWidth
      fullScreen={isSm}
      PaperProps={{
        sx: {
          maxWidth: {
            xs: 'auto',
            sm: 460,
            md: 564,
          }
        }
      }}
    >
      <DialogTitleCross>
        Aggiungi prodotto
      </DialogTitleCross>
      <DialogContent>
        <Stack
          direction="column"
          spacing={1}
          sx={{ marginTop: 1 }}
        >
          <TextField
            size="small"
            variant="outlined"
            label="Nome"
            required
          />
          <TextField
            size="small"
            variant="outlined"
            label="Prezzo"
          />

          <Divider/>

          <Autocomplete
            options={[]}
            renderInput={(params) =>
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Categoria"
              />}
          />

          <TextEditor
            label="Descrizione"
            maxCharacters={8}
          />

          <SquaresGrid
            title="Immagini"
            elements={images}
            firstElement={
              <SquareAddImage
                onAddImage={(i) => setImages(addFile(i, images))}
              />
            }
          >
            {
              i => (
                <SquareImageContainer
                  key={i.id}
                  src={i.file}
                  onDelete={() => setImages(removeFile(i, images))}
                />
              )
            }
          </SquaresGrid>
          <SquaresGrid
            title="Allegati"
            elements={pdfs}
            firstElement={
              <SquareAddAttachment
                onAddPdf={(f) => setPdfs(addFile(f, pdfs))}
              />
            }
          >
            {
              f => (
                <SquareContainer
                  key={f.id}
                  onDelete={() => setPdfs(removeFile(f, pdfs))}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                  >
                    <Typography variant="caption">
                      {f.file.name}
                    </Typography>
                    <Typography variant="caption">
                      {Utils.bytesToSize(f.file.size)}
                    </Typography>
                  </Stack>
                </SquareContainer>
              )
            }
          </SquaresGrid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
            variant='text'
          >
            Chiudi
          </Button>
          <Button
            variant='contained'
          >
            Aggiungi
          </Button>
      </DialogActions>
    </Dialog>
  )
}



interface InputBaseProps<T> {
  readonly name?: string,
  readonly error?: boolean,
  readonly onChange?: (value: T) => void,
  readonly value?: T,
}

interface TextEditorProps extends InputBaseProps<string> {
  readonly label?: string,
  readonly maxCharacters?: number,
}

function TextEditor(props: TextEditorProps) {
  const [value, setValue] = useState(props.value ?? '');
  const reactQuillRef = useRef<any>();

  useEffect(() => {
    props.onChange?.(value)
  }, [value, props])

  const getErrorColor = (theme: Theme) => {
    return props.error
      ? theme.palette.error.main
      : 'auto'
  }

  const getCharactersNum = () => {
    if(!reactQuillRef.current || !props.maxCharacters)
      return 0

    const unprivilegedEditor = reactQuillRef
      .current
      .unprivilegedEditor;

    return unprivilegedEditor.getLength()
  }

  const getMaxCharactersLabel = () => {
    if(!props.maxCharacters)
      return null

    const charatcers = getCharactersNum() == 0
      ? 0
      : getCharactersNum() - 1

    return (
      <Typography variant="caption">
        - {charatcers}/{props.maxCharacters}
      </Typography>
    )
  }

  const checkCharacterCount = (e: any) => {
    if(!props.maxCharacters)
      return

    const tooManyCharacters =
      getCharactersNum() > props.maxCharacters

    const ignoreKeys =
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'

    if (tooManyCharacters && !ignoreKeys)
      e.preventDefault();
  }

  return (
    <Stack
      direction="column"
      sx={{
        '.ql-toolbar': {
          borderColor: getErrorColor,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        },
        '.ql-container': {
          borderColor: getErrorColor,
          height: 150,
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        },
      }}
    >
      <Typography
        sx={{ color: getErrorColor }}
      >
        {props.label} {getMaxCharactersLabel()}
      </Typography>
      <ReactQuill
        ref={reactQuillRef}
        onKeyDown={checkCharacterCount}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </Stack>

  )
}
