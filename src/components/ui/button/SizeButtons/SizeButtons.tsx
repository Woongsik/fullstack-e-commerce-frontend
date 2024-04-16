import { ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { Size } from '../../../../misc/types/Size'
import CenteredContainer from '../../layout/CenteredContainer';

type Props = {
  onChange: (sizes: Size[]) => void
}

export default function SizeButtons(props: Props) {
  const [sizes, setSizes] = useState<Size[]>([]);

  const isSelected = (key: string): boolean => {
    // @ts-ignore
    return sizes.indexOf(Size[key]) > -1;
  }

  const handleClick = (key: string): void => {
    let previousSizes: Size[] = [...sizes];
    // @ts-ignore
    const index: number = sizes.indexOf(Size[key]);

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
    <CenteredContainer width={'100%'}>
      <ButtonGroup aria-label="Size button group">
        {Object.keys(Size).map((key: string) => 
            (key !== Size.OneSize && <Button 
              key={key}
              variant={checkVariant(key)} 
              onClick={() => handleClick(key)}>{key}</Button>
            )
        )}
      </ButtonGroup>
      <ButtonGroup aria-label="One Size button group" sx={{ marginLeft: 2 }}>
        <Button 
          variant={checkVariant(Size.OneSize)} 
          onClick={() => handleClick(Size.OneSize)}>{Size.OneSize}</Button>
      </ButtonGroup>
    </CenteredContainer>
  )
}
