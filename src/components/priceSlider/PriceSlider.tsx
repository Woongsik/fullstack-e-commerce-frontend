import React, { useState, useCallback } from 'react';
import * as lodash from 'lodash';
import { Box, Slider, Input } from '@mui/material';

type Props = {
  start: number,
  end: number,
  minPrice?: number,
  maxPrice?: number,
  onPriceRangeChanged: (range: number[]) => void
}

export default function PriceSlider(props: Props) {
  const { minPrice, maxPrice, start, end } = props;
  const baseMinPrice: number = minPrice ?? end * 0.3;
  const baseMaxPrice: number = maxPrice ?? end * 0.7;

  const [value, setValue] = useState<number[]>([baseMinPrice, baseMaxPrice]);

  // Optimization useCallback
  const debouce = lodash.debounce((value: number[]) => props.onPriceRangeChanged(value), 1000);
  const debouncedFunction = useCallback(debouce, [props.onPriceRangeChanged]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    debouncedFunction(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }} component={'div'} display={'flex'} alignItems={'center'}>
      <Box component={'div'} margin={'0 15px'}>{value[0]}</Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={start}
        max={end} />
      <Box component={'div'} margin={'0 15px'}>{value[1]}</Box>
    </Box>  
  );
}
