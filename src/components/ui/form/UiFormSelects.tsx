import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';

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

  const handleSelectChange = (e: SelectChangeEvent) => {
    props.onChange(e.target.value);  
  };

  return (
    <FormControl size={size} fullWidth={fullWidth} error={error}>
      {title && <InputLabel id="form-select-label">{title}</InputLabel>}
      <Select
        {...register}
        labelId="form-select-label"
        value={selectedValue?.toString()}
        label={title}
        onChange={handleSelectChange}>
        {items.map((item: any) => 
        <MenuItem key={item[valueKey]} value={item[valueKey]}>{item[displayKey]}</MenuItem>)}
      </Select>
      { error && <FormHelperText>{props.helpertext}</FormHelperText>}
    </FormControl>  
  );
}
