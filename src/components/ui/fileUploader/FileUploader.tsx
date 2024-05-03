import { ChangeEvent, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddAPhotoRounded from '@mui/icons-material/AddAPhotoRounded';

import UiDialog from '../dialog/UiDialog';
import { MUIColor, MUISize } from '../../../misc/types/MUI';
import UiThumb from '../image/UiThumb';

type Props = {
  multiple?: boolean,
  onChange: (files: File[]) => void
}
export default function FileUploader(props: Props) {
  const { multiple = true } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<(ArrayBuffer | string | null)[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [deleteApplicantIndex, setDeleteApplicantIndex] = useState<number>(-1);
  const hiddenInput = useRef<HTMLInputElement | null>(null);

  const preparePreview = (file: File) => {
    const preview = new FileReader();
    preview.onload = function () {
      if (multiple) {
        setPreviews((prev) => [...prev, preview.result]);
      } else {
        setPreviews([preview.result]);
      } 
    }

    preview.readAsDataURL(file);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const fileList: FileList = e.target.files;
      const fileListAsArray = Array.from(fileList);

      let bindFiles = multiple ? [...files] : [];
      bindFiles.push.apply(bindFiles, fileListAsArray);
      
      setFiles(bindFiles);
      emitFiles(bindFiles);

      fileListAsArray.forEach((file: File) => {
        preparePreview(file);
      });
    }
  }

  const askToDelete = (index: number) => {
    setShowDialog(true);
    setDeleteApplicantIndex(index);
  }

  const proceedDelete = (proceed: boolean) => {
    setShowDialog(false);
    
    if (proceed) {
      files.splice(deleteApplicantIndex, 1);
      previews.splice(deleteApplicantIndex, 1);
    }

    setDeleteApplicantIndex(-1);
    emitFiles(files);
  }

  const addPhoto = () => {
    hiddenInput.current?.click();
  }

  const emitFiles = (files: File[]) => {
    props.onChange(files);
  }

  return (
    <Box my={1}>
      <input 
        ref={hiddenInput}
        type={'file'}
        accept={'image/jpg, image/jpeg, image/png'}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: 'none'}} />

      <IconButton onClick={() => addPhoto()} color={MUIColor.PRIMARY} size={MUISize.LARGE}>
        <AddAPhotoRounded />
      </IconButton>
      
      <Box display={'flex'} alignItems={'center'} marginLeft={2}>
      {previews.map((preview: (string | ArrayBuffer | null), index: number) => 
        <UiThumb 
          key={index}
          image={preview as string}
          alt={`preview_${index}`}
          width={50}
          height={50}
          onClick={() => askToDelete(index)} />
      )}
      </Box>

      <UiDialog 
        show={showDialog}
        title={<span>Remove the picutre <span style={{ fontWeight: 'bold'}}>{files[deleteApplicantIndex]?.name}</span>?</span>}
        cancelTitle='Cancel'
        proceedTitle='Remove'
        proceedColor={MUIColor.ERROR}
        onClose={proceedDelete} />
    </Box>
  )
}
