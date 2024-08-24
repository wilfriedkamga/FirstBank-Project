import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';

interface ButtonComponentProps {
  text: string;
  onClick?:()=>void;
  disabled?:boolean,
  type?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';  // Types de couleurs de MUI
  styles?: SxProps;  // Styles supplémentaires à appliquer
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ text, type = 'primary', styles, disabled,onClick }) => {
  return (
    <Button variant="contained" onClick={()=>onClick?onClick():null} disabled={disabled} color={type} sx={{ padding: "10px", ...styles }}>
      {text}
    </Button>
  );
};

export default ButtonComponent;
