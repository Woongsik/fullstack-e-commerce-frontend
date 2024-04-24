import { MouseEvent, useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

import CenteredContainer from '../../layout/CenteredContainer';
import { MUIColor, MUILayout, MUISize } from '../../../../misc/types/MUI';
import { useTheme } from '../../../contextAPI/ThemeContext';

type Props = {
  title?: string;
  values: string[];
  selectedValue?: string;
  onChange: (value: string | null) => void
}

export default function SortButton(props: Props) {
  const { title, selectedValue, values } = props;
  const [value, setValue] = useState<string | null | undefined>(selectedValue);
  const { theme, toggleTheme, isThemeLight } = useTheme();

  const handleChange = (e: MouseEvent<HTMLElement>, value: string | null) => {
    setValue(value);
    props.onChange(value);
  };

  return (
    <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN}>
     {title && <Typography>{title}</Typography>}
      <ToggleButtonGroup
        value={value}
        exclusive
        color={MUIColor.PRIMARY}
        onChange={handleChange}
        aria-label={title}
        size={MUISize.SMALL}
        sx={{ backgroundColor: 'white'}}>

        {values.map((value: string) => 
        <ToggleButton value={value} aria-label={value} key={value}>
          {value}
        </ToggleButton>
        )}
      </ToggleButtonGroup>
    </CenteredContainer> 
  );
}
