import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


type childComponents={
   table:any[],
   multiple:boolean,
   setRole: (role: string) => void;
}

export default function SelectItem({ table, multiple, setRole }: childComponents) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setPersonName(newValue);
    setRole(newValue[0]); // Assuming single selection
  };

  return (
    <div className='w-full'>
      <FormControl sx={{ width: "100%" }}>
        
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          placeholder='voici'
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput/>}
          renderValue={(selected) => {
            if (selected.length == 0|| selected==null) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          className='w-full'
        >
          <MenuItem value="">
            <em>Aucune</em>
          </MenuItem>
          {table.map((name) => (
            <MenuItem key={name} value={name}>
             {multiple? <Checkbox checked={personName.indexOf(name) > -1} />:null}
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
