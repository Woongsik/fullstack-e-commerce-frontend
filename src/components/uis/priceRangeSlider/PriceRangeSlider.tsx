import { useState, useCallback } from 'react';
import * as lodash from 'lodash';
import { Box, Slider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

type Props = {
  minPrice?: number,
  maxPrice?: number,
  onPriceRangeChanged: (range: number[]) => void
}

export default function PriceRangeSlider(props: Props) {
  const { minPrice, maxPrice } = props;
  const { minMaxPrice } = useSelector((state: AppState) => state.productReducer);
  const baseMinPrice: number = minPrice ?? minMaxPrice[0];
  const baseMaxPrice: number = maxPrice ?? minMaxPrice[1];

  console.log('minMax from selector', minMaxPrice);

  const [value, setValue] = useState<number[]>([baseMinPrice, baseMaxPrice]);
  
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
      <Box sx={{ width: 300 }} component={'div'} display={'flex'} alignItems={'center'}>
        <Box component={'div'} margin={'0 15px'}>{value[0]}</Box>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={minMaxPrice[0]}
          max={minMaxPrice[1]} />
        <Box component={'div'} margin={'0 15px'}>{value[1]}</Box>
      </Box>  
    </Box>
    
  );
}
