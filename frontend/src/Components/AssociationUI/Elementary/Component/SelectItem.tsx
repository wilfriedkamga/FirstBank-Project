import * as React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

type SimpleSelectProps = {
  options: string[];
  onSelect: (selected: string) => void;
  defaultValue?: string;
};

const SelectItem: React.FC<SimpleSelectProps> = ({
  options,
  onSelect,
  defaultValue,
}) => {
  const [selected, setSelected] = React.useState<string>(
    options.length > 0 ? options[0] : ""
  );

  React.useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0]);
      onSelect(options[0]);
    }
  }, [options, onSelect]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={selected}
        onChange={handleChange}
        displayEmpty
        sx={{ width: "100%" }}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Placeholder</em>;
          }

          return selected;
        }}
      >
        <MenuItem key={123} value={"default value"}>
          voici le premier element
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectItem;
