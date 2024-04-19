import { ButtonGroup, Button, Divider, Box } from '@mui/material'
import { useState } from 'react'
import { Size } from '../../../../misc/types/Size'
import CenteredContainer from '../../layout/CenteredContainer';
import { MUILayout } from '../../../../misc/types/MUI';

type Props = {
  items?: string[];
  selectedValues?: Size[];
  multiple?: boolean;
  justifyContent?: MUILayout;
  editMode?: boolean;
  onChange: (sizes: Size[]) => void;
}

export default function SizeButtons(props: Props) {
  const { 
    selectedValues = [], 
    items = Object.keys(Size), 
    multiple = true, 
    justifyContent = MUILayout.CENTER,
    editMode = false } = props;
  const [sizes, setSizes] = useState<Size[]>(selectedValues);

  const isSelected = (key: string): boolean => {
    // @ts-ignore
    return sizes.indexOf(Size[key]) > -1;
  }

  const handleClick = (key: string): void => {
    let previousSizes: Size[] = [...sizes];
    // @ts-ignore
    const index: number = sizes.indexOf(Size[key]);

    if (!multiple) {
      if (index > -1) {
        previousSizes = [];
      } else {
        // @ts-ignore
        previousSizes = [Size[key]];
      }

      setSizes(previousSizes);
      return props.onChange(previousSizes);
    }

    if (key === Size.OneSize) {
      // If onesize, then remove all the sizes
      if (index > -1) {
        previousSizes = [];
        setSizes(previousSizes);
      } else {
        previousSizes = [Size[key]]
        setSizes(previousSizes);
      }
    } else {
      // if other sizes, then remove onesize
      const oneSizeIndex: number = sizes.indexOf(Size.OneSize);
      if (oneSizeIndex > -1) {
        previousSizes = [];
      }

      if (index > -1) {
        previousSizes.splice(index, 1);
        setSizes(previousSizes);
      } else {
        // @ts-ignore
        previousSizes.push(Size[key]);
        setSizes(previousSizes);
      }
    }

    props.onChange(previousSizes);
  }

  const checkVariant = (key: string): "contained" | "outlined" => {
    return isSelected(key) ? 'contained' : 'outlined';
  }

  return (
    <CenteredContainer width={'100%'} justifyContent={justifyContent}>
      <CenteredContainer width={'100%'}>
        <ButtonGroup aria-label="Size button group">
          {items.map((key: string) => 
            (key !== Size.OneSize && 
              <Button 
                key={key}
                variant={checkVariant(key)} 
                onClick={() => handleClick(key)}>
                {key}
              </Button>
            )
          )}
        </ButtonGroup>
      </CenteredContainer>
      
    {items.indexOf(Size.OneSize) > -1 && 
      <Box width={'100%'} marginTop={ editMode ? '15px' : ''}>        
        {editMode && <Divider />}

        <CenteredContainer width='100%' margin={editMode ? '15px 0 0 0' : ''}>
          <ButtonGroup aria-label="One Size button group">
            <Button 
              variant={checkVariant(Size.OneSize)} 
              onClick={() => handleClick(Size.OneSize)}>{Size.OneSize}</Button>
          </ButtonGroup>
        </CenteredContainer>
      </Box>
    }
    </CenteredContainer>
  )
}