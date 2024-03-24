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
}

export default function UiFormSelects(props: Props) {
  const { title, selectedValue, items, displayKey, valueKey, size, fullWidth, register, error } = props; 
  const { isThemeLight } = useTheme();

  const handleSelectChange = (e: SelectChangeEvent) => {
    props.onChange(e.target.value);  
  };

  return (
    <FormControl size={size} fullWidth={fullWidth} error={error}>
      {title && <InputLabel id="form-select-label" sx={{ color: isThemeLight ? 'white !important' : 'black' }}>{title}</InputLabel>}
      <Select
        {...register}
        labelId="form-select-label"
        value={selectedValue?.toString()}
        label={title}
        sx={{ color: isThemeLight ? 'white' : 'black',
          '&.MuiInputBase-root > *': {
            color: isThemeLight ? 'white' : 'black',
            borderColor: isThemeLight ? 'white !important' : 'black'
          }
        }}
        onChange={handleSelectChange}>
        {items.map((item: any) => 
        <MenuItem key={item[valueKey]} value={item[valueKey]}>{item[displayKey]}</MenuItem>)}
      </Select>
      { error && <FormHelperText>{props.helpertext}</FormHelperText>}
    </FormControl>  
  );
}
