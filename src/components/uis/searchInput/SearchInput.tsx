import React, { useCallback, useState } from 'react';
import * as lodash from 'lodash';
import { 
  Box, 
  FormControl, 
  TextField, 
  IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  title: string;
  preText?: string;
  onTextChanged: (text:string) => void;
}

export default function SearchInput(props: Props) {
  const { title, preText } = props;
  const [searchPhrase, setSearchPhrase] = useState<string>(preText ?? '');

  // Optimization with useCallback & debounce
  const debouce = lodash.debounce((value: string) => props.onTextChanged(value), 1000);
  const debouncedFunction = useCallback(debouce, [props.onTextChanged]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchPhrase(value);
    debouncedFunction(value);
  }

  const clear = () => {
    console.log('Clear');
    setSearchPhrase('');
    props.onTextChanged('');
  }

  return (
    <FormControl fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '5px 10px' }}>
        <SearchIcon 
          sx={{ color: 'action.active', mr: 2, mt: 1.5 }} />
        <TextField 
          fullWidth
          label={title} 
          variant="standard" 
          value={searchPhrase}
          onChange={handleChange} />

        <IconButton 
          onClick={clear}
          color="default" 
          aria-label="Clear the search"
          sx={{ mt: 1.5 }}>
          <CancelIcon />
        </IconButton>
      </Box>
    </FormControl>
  )
};
