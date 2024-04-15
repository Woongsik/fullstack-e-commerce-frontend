import React, { useCallback, useState } from 'react';
import * as lodash from 'lodash';
import { 
  Box, 
  FormControl, 
  TextField, 
  IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '../../contextAPI/ThemeContext';

type Props = {
  title: string;
  preText?: string;
  onTextChanged: (text:string) => void;
}

export default function SearchInput(props: Props) {
  const { title, preText } = props;
  const { isThemeLight } = useTheme();
  const [searchPhrase, setSearchPhrase] = useState<string>(preText ?? '');

  // Optimization with useCallback & debounce
  const debouce = lodash.debounce((value: string) => props.onTextChanged(value), 1000);
  const debouncedFunction = useCallback(debouce, [props.onTextChanged]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchPhrase(value);
    debouncedFunction(value);
  };

  const clear = () => {
    setSearchPhrase('');
    props.onTextChanged('');
  };

  const textFieldCss = {
    '&.MuiFormControl-root > *': {
      color: isThemeLight ? 'white': 'black',
      borderColor: isThemeLight ? 'black': 'white',
    }
  };

  return (
    <FormControl fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
        <SearchIcon 
          sx={{ color: isThemeLight ? 'white' : 'action.active', mr: 2, mt: 1.5 }} />
        <TextField 
          fullWidth
          label={title} 
          variant="standard" 
          value={searchPhrase}
          onChange={handleChange}
          sx={textFieldCss} />

        <IconButton 
          onClick={clear}
          color={"default"} 
          aria-label="Clear the search"
          sx={{ mt: 1.5 }}>
          <CancelIcon sx={{ color: isThemeLight ? 'white' : ''}} />
        </IconButton>
      </Box>
    </FormControl>
  )
};
