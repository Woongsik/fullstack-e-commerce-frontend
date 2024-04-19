import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, ButtonGroup, IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import LaunchIcon from '@mui/icons-material/Launch';

import UiDialog from '../../ui/dialog/UiDialog';
import { apiService } from '../../../services/APIService';
import LoadingAndMessage from '../../ui/loadingAndMessage/LoadingAndMessage';
import { MUIColor } from '../../../misc/types/MUI';
import { Product } from '../../../misc/types/Product';
import AddProduct from './AddProduct';

type Props = {
  product: Product;
  onProductDeleted: (productId: string) => void,
  onProductUpdated: (updatedProduct: Product) => void
}

enum Mode {
  EDIT = 'EDIT',
  READ = 'READ'
}

export default function ProductDetailsRow(props: Props) {
  const { product } = props;
  const [mode, setMode] = useState<Mode>(Mode.READ);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
  }

  const clear = () => {
    changeMode(Mode.READ);
  }

  const askToRemoveCategory = () => {
    setShowDialog(true);
  } 

  const handleClose = (proceed: boolean) => {
    setShowDialog(false);

    if (proceed) {
      removeProduct();
    }
  } 

  const removeProduct = async () => {
    try {
      setLoading(true);
      await apiService.deleteProduct(product._id);
      props.onProductDeleted(product._id);
    } catch (e) {
      const error = e as Error;
      setError(`Cannot delete product, ${error.message}`);
    }

    setLoading(false);    
  }

  const triggerUpdate = () => {
    setUpdate(true);
    setTimeout(() => {
      setUpdate(false);
    }, 500);
  }

  const handleUpdate = (updatedProduct: Product) => {
    props.onProductUpdated(updatedProduct);
    setMode(Mode.READ);
  }

  return (
      <TableRow>
      {mode === Mode.READ ? 
        <>
          <TableCell>
            <img src={product.images && product.images[0]} height={'50px'} width={'50px'} />
          </TableCell>
          <TableCell>
            {product.title}
          </TableCell>
          <TableCell align='right'>
            {product.price}
          </TableCell>
        </>
      : 
        <TableCell colSpan={3}>
          <AddProduct
            product={product}
            update={update}
            onUpdate={handleUpdate} />
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
          <IconButton sx={{ marginTop: 1}}>
            <Link to={`/product/${product._id}`}>
              <LaunchIcon color={MUIColor.INFO} />
            </Link>
          </IconButton>
        </ButtonGroup>
        : 
        <ButtonGroup>
          <IconButton onClick={clear}>
            <CancelIcon color={MUIColor.WARNING}/>
          </IconButton>
          <IconButton onClick={triggerUpdate}>
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
        title={`Are you sure you want to delete "${product.title}"`} 
        proceedTitle='Delete' 
        cancelTitle={'Cancel'} 
        onClose={handleClose} />
    </TableRow>

  )
}
