import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

// Définir les styles pour le bouton en utilisant MUI's styled
const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  fontWeight: theme.typography.fontWeightBold,
  padding: "9px",
  fontSize: theme.typography.pxToRem(14),
  letterSpacing: '0.05em',
  color: '#fff',
  textTransform: 'capitalize',
  backgroundColor: '#e53935', // couleur bg-red-600
  borderRadius: "10px",
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: '#d32f2f', // couleur bg-red-400
  },
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 3px rgba(255, 82, 82, 0.5)`, // couleur focus:ring-red-300
  },
}));

type SubmitedButtonProps = {
  text: string;          // Le texte du bouton
  onClick?: () => void;  // Fonction de clic
  disabled?: boolean;    // État de désactivation
  isLoading?: boolean;   // État de chargement
  timeout?: number;      // Délai avant d'appeler la fonction de clic
};

const SubmitedButton: React.FC<SubmitedButtonProps> = ({
  text,
  onClick,
  disabled = false,
  isLoading = false,
  timeout = 0,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    if (isLoading) return;

    setIsProcessing(true);

    if (timeout > 0) {
      setTimeout(() => {
        setIsProcessing(false);
        if (onClick) onClick();
      }, timeout);
    } else {
      setIsProcessing(false);
      if (onClick) onClick();
    }
  };

  return (
    <StyledButton
      type='submit'
      variant="contained"
      onClick={handleClick}
      disabled={disabled}
      disableElevation
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : text}
    </StyledButton>
  );
};

export default SubmitedButton;
