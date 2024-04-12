import { useState, useCallback, useEffect } from 'react';
import * as lodash from 'lodash';
import { Box, Slider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import CenteredContainer from '../layout/CenteredContainer';
import { MUILayout } from '../../../misc/types/MUI';

type Props = {
  minPrice?: number,
  maxPrice?: number,
  onPriceRangeChanged: (range: number[]) => void
}

export default function PriceRangeSlider(props: Props) {
  const { minPrice, maxPrice } = props;
  const { minMaxPrice } = useSelector((state: AppState) => state.productReducer);
  const baseMinPrice: number = minPrice ?? minMaxPrice.min;
  const baseMaxPrice: number = maxPrice ?? minMaxPrice.max;
  const [value, setValue] = useState<number[]>([baseMinPrice, baseMaxPrice]);

  useEffect(() => {
    setValue([minMaxPrice.min, minMaxPrice.max]);
  }, [minMaxPrice]);
  
  // Optimization with useCallback & debounce
  const debouce = lodash.debounce((value: number[]) => props.onPriceRangeChanged(value), 1000);
  const debouncedFunction = useCallback(debouce, [props.onPriceRangeChanged]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    debouncedFunction(newValue as number[]);
  };

  return (
    <Box>
      <Typography>
        Price range
      </Typography>
      <CenteredContainer width={'300px'} justifyContent={MUILayout.SPACE_BETWEEN}>
        <Box marginLeft={'5px'}>€ {value[0]}</Box>
        <Box marginRight={'5px'}>€ {value[1]}</Box>
      </CenteredContainer> 
      <CenteredContainer margin={'0 15px'}>
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={minMaxPrice.min}
            max={minMaxPrice.max} />
        </CenteredContainer> 
    </Box>
    
  );
}
