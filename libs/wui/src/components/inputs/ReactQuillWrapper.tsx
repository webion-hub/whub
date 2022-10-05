import { MutableRefObject } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

interface ReactQuillWrapperProps extends ReactQuillProps {
  readonly reactQuillRef: MutableRefObject<any>;
}

export default function ReactQuillWrapper(props: ReactQuillWrapperProps) {
  const { reactQuillRef, ...other } = props;

  return <ReactQuill ref={reactQuillRef} {...other} />;
}
