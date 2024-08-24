import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Définition des props pour le composant
interface TextFieldPasswordProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  unview?: boolean;
  readOnly?: boolean;
  required?: boolean; // Détermine si le mot de passe est visible ou non
}

function TextFieldPassword({
  label,
  value,
  onChange,
  helperText,
  readOnly=false,
  placeholder = "Entrez le mot de passe",
  disabled=false,
  error,
  unview = false,
  required = false,
}: TextFieldPasswordProps) {
  const [showPassword, setShowPassword] = useState(!unview);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      required={required}
      fullWidth
      error={error}
      helperText={helperText}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              disabled={disabled}
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: "20px", color: "#666" }} />
              ) : (
                <Visibility sx={{ fontSize: "20px", color: "#666" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
        readOnly: readOnly,
      }}

      FormHelperTextProps={{
        style: { fontSize: '10px',marginTop:"5px",marginLeft:"0px" }  // Modifie la taille du texte d'aide
      }}

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
          height: "55px",
          marginTop:"0px"
        },
      }}
    />
  );
}

export default TextFieldPassword;
