import { Stack, Theme, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { InputBaseProps } from "../../abstractions/form/InputBaseProps";

export interface TextEditorProps extends InputBaseProps<string> {
  readonly label?: string,
  readonly maxCharacters?: number,
}

export function TextEditor(props: TextEditorProps) {
  const [value, setValue] = useState(props.value ?? '');
  const reactQuillRef = useRef<any>();

  useEffect(() => {
    props.onChange?.(value)
  }, [value, props])

  const areTooManyCharacters = (ignoreFirst?: boolean) => {
    if(!props.maxCharacters)
      return false

    return getCharactersNum(ignoreFirst) > props.maxCharacters
  }

  const getErrorColor = (theme: Theme) => {
    return props.error || areTooManyCharacters(true)
      ? theme.palette.error.main
      : 'auto'
  }

  const getCharactersNum = (ignoreFirst?: boolean) => {
    if(!reactQuillRef.current || !props.maxCharacters)
      return 0

    const unprivilegedEditor = reactQuillRef
      .current
      .unprivilegedEditor;

    const removeFirst = ignoreFirst
      ? -1
      : 0

    return unprivilegedEditor.getLength() + removeFirst
  }

  const getMaxCharactersLabel = () => {
    if(!props.maxCharacters)
      return null

    const charatcers = getCharactersNum() === 0
      ? 0
      : getCharactersNum(true)

    return (
      <Typography variant="caption">
        - {charatcers}/{props.maxCharacters}
      </Typography>
    )
  }

  const checkCharacterCount = (e: any) => {
    if(!props.maxCharacters)
      return

    const ignoreKeys =
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'

    if (areTooManyCharacters() && !ignoreKeys)
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
