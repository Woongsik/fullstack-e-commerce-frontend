import { useRef, useState } from 'react';
import { Box,ButtonGroup, IconButton, TableCell, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import { Category, CategoryBase } from '../../../../../../../misc/types/Category';
import UiDialog from '../../../../../../ui/dialog/UiDialog';
import { apiService } from '../../../../../../../services/APIService';
import LoadingAndMessage from '../../../../../../ui/loadingAndMessage/LoadingAndMessage';
import { MUIColor } from '../../../../../../../misc/types/MUI';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from '../../../../../../contextAPI/ThemeContext';
import { deleteCategory, updateCategory } from '../../../../../../../redux/slices/CategorySlice';

type Props = {
  category: Category;
}

enum Mode {
  EDIT = 'EDIT',
  READ = 'READ'
}

export default function CategoryDetailsRow(props: Props) {
  const { category } = props;
  const [mode, setMode] = useState<Mode>(Mode.READ);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryBase>();
  const { isThemeLight } = useTheme();
  const dispatch = useDispatch();
  const hiddenInput = useRef<HTMLInputElement | null>(null);

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
  }

  const clear = () => {
    // reset fields
    changeMode(Mode.READ);
  }

  const onSubmit: SubmitHandler<CategoryBase> = async (data: CategoryBase) => {    
    if (data.image !== category.image || data.title !== category.title) {
      try {
        setLoading(true);
        const updatedCategory: Category = await apiService.updateCategory(category._id, data);
        await dispatch(updateCategory(updatedCategory));
        setMode(Mode.READ);
      } catch (e) {
        const error = e as Error;
        setError(`Cannot update category, ${error.message}`);
      }

      setLoading(false);
    }
  }

  const askToRemoveCategory = () => {
    setShowDialog(true);
  } 

  const handleClose = (proceed: boolean) => {
    setShowDialog(false);

    if (proceed) {
      removeCategory();
    }
  } 

  const removeCategory = async () => {
    try {
      setLoading(true);
      await apiService.deleteCategory(category._id);
      await dispatch(deleteCategory(category));
    } catch (e) {
      const error = e as Error;
      setError(`Cannot delete category, ${error.message}`);
    }

    setLoading(false);    
  }

  const update = () => {
    hiddenInput.current?.click();
  }

  return (
      <TableRow>
      {mode === Mode.READ ? 
        <>
          <TableCell>
            <img src={category.image} height={'50px'} width={'50px'} alt={'category_image'}/>
          </TableCell>
          <TableCell align='center'>
            {category.title}
          </TableCell>
        </>
      : 
        <TableCell colSpan={2}>
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)} width={'100%'}>  
            <Box minWidth={'200px'} marginBottom={2}>
              <TextField
                fullWidth
                {...register("title", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
                error={Boolean(errors.title)}
                label="Category title"
                helperText={errors.title && 'No special characters, only (?.,=_@&-) accepted'}
                defaultValue={category.title} />
            </Box>

            <Box minWidth={'200px'}>
              <TextField
                fullWidth
                {...register("image", { pattern: /[A-Za-z0-9]+[://]+[A-Za-z0-9-]+[.]/ }) }                                                          
                error={Boolean(errors.image)}
                label="Category image"
                helperText={errors.image && 'Only valid URL accepted'}
                defaultValue={category.image ?? "https://picsum.photos/800" } />
            </Box>
            <input type='submit' ref={hiddenInput} style={{ display: 'none' }}/>
          </Box>
        </TableCell>
      }
      <TableCell align="center">
        { mode === Mode.READ ? 
        <ButtonGroup>
          <IconButton onClick={askToRemoveCategory}>
            <DeleteIcon color={MUIColor.ERROR} />
          </IconButton>
          <IconButton onClick={() => changeMode(Mode.EDIT)}>
            <EditIcon color={MUIColor.PRIMARY} />
          </IconButton>
        </ButtonGroup>
        : 
        <ButtonGroup>
          <IconButton onClick={clear}>
            <CancelIcon color={MUIColor.WARNING}/>
          </IconButton>
          <IconButton onClick={update}>
            <SaveIcon color={MUIColor.INFO}/>
          </IconButton>
        </ButtonGroup>
        }

        <Box>
        <LoadingAndMessage 
          loading={loading}
          error={error}
          size={25} />
        </Box>        
      </TableCell>

      <UiDialog 
        show={showDialog} 
        title={`Are you sure you want to delete "${category.title}"`} 
        proceedTitle='Delete' 
        cancelTitle={'Cancel'} 
        onClose={handleClose} />
    </TableRow>
  )
}
