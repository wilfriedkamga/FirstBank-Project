import * as React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { RoleModel } from "../../../../Services/Types/RoleModel";

type SimpleSelectProps = {
  options: RoleModel[];
  onSelect: (selected: RoleModel) => void;
  value: string;
};

const SelectItem2: React.FC<SimpleSelectProps> = ({
  options,
  onSelect,
  value,
}) => {

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const newRole = options.find((role) => role.id === selectedValue);
    if (newRole) {
      onSelect(newRole);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={value}
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.labelV}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectItem2;
