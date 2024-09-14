import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFile{
    name: string,
    handleChange: (event:  React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputFileUpload(props: InputFile) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {props.name}
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => props.handleChange(event)}
        multiple
      />
    </Button>
  );
}