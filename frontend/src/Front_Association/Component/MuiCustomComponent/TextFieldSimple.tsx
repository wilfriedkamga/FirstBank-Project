import React from 'react';
import { TextField } from '@mui/material';

// Définition des props pour le composant
interface TextFieldSimpleProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  readOnly?:boolean;
  placeholder?:string,
  required?:boolean
}

function TextFieldSimple({
  label,
  value,
  onChange,
  helperText,
  disabled,
  readOnly,
  error,
  placeholder="un champ de texte",
  required=false
}: TextFieldSimpleProps) {
  return (
    <TextField
      required={required}
      fullWidth
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      helperText={helperText}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{readOnly:readOnly}}
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

      FormHelperTextProps={{
        style: { fontSize: '10px',marginTop:"5px",marginLeft:"0px" }  // Modifie la taille du texte d'aide
      }}
    />
  );
}

export default TextFieldSimple;
