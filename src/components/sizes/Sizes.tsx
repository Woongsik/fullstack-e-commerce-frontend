import { Box } from '@mui/material';

import UiFormSelects from '../ui/form/UiFormSelects';
import { Size } from '../../misc/types/Size';

type Props = {
  selectedSize?: Size;
  onSizeChanged: (size?: Size) => void;
};

export default function Sizes(props: Props) {
  const { selectedSize } = props;
  const sizes: {title: string, value: Size }[] = Object.keys(Size).map((key: string) => {
    return {
      title: key,
      // @ts-ignore
      value: Size[key]
    }
  });

  const sizeAll = {
    title: 'All',
    value: '0' as Size
  }

  sizes.unshift(sizeAll);

  const handleChange = (value: string) => {
    props.onSizeChanged(value === '0' ? undefined : value as Size);
  }

  return (
    <Box width={'100%'}>
      <UiFormSelects 
        title='Sizes'
        selectedValue={selectedSize ?? '0'}
        items={sizes}
        displayKey='title'
        valueKey='value'
        size='medium'
        fullWidth={true}
        onChange={handleChange} /> 
    </Box>
  )
}
