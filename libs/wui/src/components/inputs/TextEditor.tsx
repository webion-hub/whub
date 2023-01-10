import { Stack, Theme, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { InputBaseProps } from '../../abstractions/form/InputBaseProps';

const ReactQuillWrapper = dynamic(import('./ReactQuillWrapper'), {
  ssr: false,
});

export interface TextEditorProps extends InputBaseProps<string> {
  readonly label?: string;
  readonly required?: boolean;
  readonly maxCharacters?: number;
}

export function TextEditor(props: TextEditorProps) {
  const reactQuillRef = useRef<any>();

  const areTooManyCharacters = (ignoreFirst?: boolean) => {
    if (!props.maxCharacters) return false;

    return getCharactersNum(ignoreFirst) > props.maxCharacters;
  };

  const getErrorColor = (theme: Theme) => {
    return props.error || areTooManyCharacters(true)
      ? theme.palette.error.main
      : 'auto';
  };

  const getCharactersNum = (ignoreFirst?: boolean) => {
    if (!reactQuillRef.current || !props.maxCharacters) return 0;

    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;

    const removeFirst = ignoreFirst ? -1 : 0;

    return unprivilegedEditor.getLength() + removeFirst;
  };

  const getMaxCharactersLabel = () => {
    if (!props.maxCharacters) return null;

    const charatcers = getCharactersNum() === 0 ? 0 : getCharactersNum(true);

    return (
      <Typography variant="caption">
        - {charatcers}/{props.maxCharacters}
      </Typography>
    );
  };

  const checkCharacterCount = (e: any) => {
    if (!props.maxCharacters) return;

    const ignoreKeys =
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown';

    if (areTooManyCharacters() && !ignoreKeys) e.preventDefault();
  };

  const handleKeyDown = (e: any) => {
    props.disabled ? e.preventDefault() : checkCharacterCount(e);
  };

  return (
    <Stack
      direction="column"
      sx={{
        '.ql-toolbar': {
          borderColor: getErrorColor,
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        },
        '.ql-container': {
          borderColor: getErrorColor,
          height: 150,
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
        },
      }}
    >
      <Typography sx={{ color: getErrorColor }}>
        {props.label}
        {props.required ? '*' : ''} {getMaxCharactersLabel()}
      </Typography>
      <ReactQuillWrapper
        reactQuillRef={reactQuillRef}
        onKeyDown={handleKeyDown}
        theme="snow"
        value={props.value}
        onChange={(v, _) => props.onChange?.({ target: { value: v } })}
      />
    </Stack>
  );
}

export default TextEditor
