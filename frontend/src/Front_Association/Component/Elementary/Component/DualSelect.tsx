import React, { useState, ChangeEvent } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { MembreAssociationModel } from "../../../../Services/Types/MembreAssociationModel";

interface DualSelectProps {
  options: MembreAssociationModel[];
  label1: string;
  label2: string;
  setValue1: (valid1: string) => void;
  setValue2: (valid2: string) => void;
}

const DualSelect: React.FC<DualSelectProps> = ({
  options,
  setValue1,
  setValue2,
  label1,
  label2,
}) => {
  const [selectedValue1, setSelectedValue1] = useState<string>("");
  const [selectedValue2, setSelectedValue2] = useState<string>("");

  const handleChangeValue1 = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelectedValue1(value);
    setValue1(value);
    setSelectedValue2((prev) => (prev === value ? "" : selectedValue2));
  };

  const handleChangeValue2 = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelectedValue2(value);
    setValue2(value);
    setSelectedValue1((prev) => (prev === value ? "" : selectedValue1));
  };

  const filteredOptions1 = options.filter(
    (option) => option.id !== selectedValue2
  );
  const filteredOptions2 = options.filter(
    (option) => option.id !== selectedValue1
  );

  return (
    <div className="">
      <FormControl style={{ marginBottom: "10px" }} fullWidth>
        <label className="font-bold mt-" htmlFor="">
          {label1}
        </label>
        <Select
          value={selectedValue1}
          onChange={(event) => handleChangeValue1(event)}
        >
          {filteredOptions1.map((option) => (
            <MenuItem key={option.id} value={option.phone}>
              {option.name + "  " + option.phone + " " + option.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ marginBottom: "10px" }} className="mb-4" fullWidth>
        <label className="font-bold mt-" htmlFor="">
          {label2}
        </label>
        <Select
          value={selectedValue2}
          onChange={(event) => handleChangeValue2(event)}
          className=""
        >
          {filteredOptions2.map((option) => (
            <MenuItem key={option.id} value={option.phone}>
              <div className="rounded flex border p-2">
                  { option.name + "  "+option.role+ " " + option.phone  }
              </div>
              
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DualSelect;
