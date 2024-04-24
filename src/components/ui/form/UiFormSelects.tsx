import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';
import { useTheme } from '../../contextAPI/ThemeContext';

type Props = {
  title?: string;
  selectedValue?: string;
  items: any[];
  displayKey: string;
  valueKey: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  onChange: (value: string) => void;
  register?: any;
  error?: boolean;
  helpertext?: string;
  disableTheme?: boolean;
}

export default function UiFormSelects(props: Props) {
  const { title, selectedValue, items, displayKey, valueKey, size, fullWidth, register, error, disableTheme = false } = props; 
  const { isThemeLight } = useTheme();

  const titleTheme = { color: isThemeLight ? 'white !important' : 'black' };
  const selectsTheme = { 
    color: isThemeLight ? 'white' : '',
    '&.MuiInputBase-root > *': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white !important' : ''
    }
  }
  
  const handleSelectChange = (e: SelectChangeEvent) => {
    props.onChange(e.target.value);  
  };

  return (
    <FormControl size={size} fullWidth={fullWidth} error={error}>
      {title && <InputLabel id="form-select-label" sx={disableTheme ? {} : titleTheme}>{title}</InputLabel>}
      <Select
        {...register}
        labelId="form-select-label"
        value={selectedValue?.toString()}
        label={title}
        sx={disableTheme ? {} : selectsTheme}
        onChange={handleSelectChange}>
        {items.map((item: any) => 
        <MenuItem key={item[valueKey]} value={item[valueKey]}>{item[displayKey]}</MenuItem>)}
      </Select>
      { error && <FormHelperText>{props.helpertext}</FormHelperText>}
    </FormControl>  
  );
}
