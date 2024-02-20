import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
  title: string;
  selectedValue?: string;
  items: any[];
  displayKey: string;
  valueKey: string;
  size?: "small" | "medium";
  fullWidth?: boolean
  onChange: (value: string) => void;
}

export default function FormSelects(props: Props) {
  const { title, selectedValue, items, displayKey, valueKey, size, fullWidth } = props; 

  const handleSelectChange = (e: SelectChangeEvent) => {
    props.onChange(e.target.value);  
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size={size} fullWidth={fullWidth}>
      <InputLabel id="form-select-label">{title}</InputLabel>
      <Select
        labelId="form-select-label"
        value={selectedValue?.toString()}
        label={title}
        onChange={handleSelectChange}>
        {items.map((item: any) => 
        <MenuItem key={item[valueKey]} value={item[valueKey]}>{item[displayKey]}</MenuItem>)}
      </Select>
    </FormControl>  
  );
}
