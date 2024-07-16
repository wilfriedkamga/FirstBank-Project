import * as React from 'react';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, SelectChangeEvent } from '@mui/material';

type SimpleSelectProps = {
  options: any[];
  onSelect: (selected: string) => void;
};

const SimpleSelect: React.FC<SimpleSelectProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = React.useState<string>(options.length > 0 ? options[0].value : '');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelected(value);
    onSelect(value);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="simple-select-label">Select Item</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Select Item" />}
        sx={{ width: '100%' }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
