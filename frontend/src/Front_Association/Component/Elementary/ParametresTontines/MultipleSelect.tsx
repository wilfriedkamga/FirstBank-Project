import * as React from 'react';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';

type MultipleSelectProps = {
  options: any[];
  onSelect: (selected: string[]) => void;
};

const MultipleSelect: React.FC<MultipleSelectProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = React.useState<string[]>(options.length > 0 ? [options[0].value] : []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelected(value);
    onSelect(value);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        labelId="multiple-select-label"
        id="multiple-select"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Select Items" />}
        renderValue={(selected) => selected.join(', ')}
        sx={{ width: '100%' }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            <Checkbox checked={selected.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
