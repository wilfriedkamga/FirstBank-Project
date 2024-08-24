import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";

// Définition des props pour le composant
interface SelectItemProps<T> {
  label: string;
  options: T[]; // Tableau des options
  valueKey: keyof T; // Clé pour récupérer la valeur d'une option
  labelKey: keyof T; // Clé pour récupérer l'étiquette à afficher
  value: string;
  onChange: (value: string) => void;
  helperText?: string; // Texte d'aide facultatif
  disabled?: boolean;
  error?: boolean; // Indique si le champ est en erreur pour appliquer la bordure rouge
  placeholder?: string; // Texte de placeholder facultatif
}

function SelectItem<T extends { [key: string]: any }>({
  label,
  options,
  valueKey,
  labelKey,
  value,
  onChange,
  helperText,
  disabled,
  error,
  placeholder,
}: SelectItemProps<T>) {
  const [labelReel, setLabelReel] = useState<String>(label);

  useEffect(() => {});

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={error}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E5E7EB",
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: "#aaa",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ef4444",
            borderWidth: "0px",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.4)",
          },
          borderRadius: "10px",
          border: "0px solid gray",
          height: "50px",
        },
      }}
    >
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        renderValue={(selected) =>
          selected == "default" ? (
            <span className=" text-gray-500">{placeholder}</span>
          ) : (
            selected
          )
        }
       
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E5E7EB",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#aaa",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ef4444",
              borderWidth: "0px",
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.4)",
            },
            borderRadius: "10px",
            border: "0px solid gray",
            height: "50px",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={String(option[valueKey])}>
            {String(option[labelKey])}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText sx={{ fontSize: "10px", marginTop: "5px" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default SelectItem;
