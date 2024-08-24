import React from 'react';
import { TextField } from '@mui/material';

// Définition des props pour le composant
interface TextFieldAmountProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  currencySymbol: string; // Symbole de la devise
  minAmount?: number; // Montant minimum
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
}

function TextFieldAmount({
  label,
  value,
  onChange,
  currencySymbol,
  minAmount = 0,
  helperText,
  disabled,
  error,
}: TextFieldAmountProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/[^0-9.]/g, '');
    if (Number(numericValue) >= minAmount) {
      onChange(numericValue);
    }
  };

  return (
    <TextField
      fullWidth
      value={`${currencySymbol}${value}`}
      onChange={handleChange}
      helperText={helperText}
      error={error}
      disabled={disabled}
      margin="normal"
      variant="outlined"
      InputProps={{
        startAdornment: <span>{currencySymbol}</span>,
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
        },
      }}
    />
  );
}

export default TextFieldAmount;
