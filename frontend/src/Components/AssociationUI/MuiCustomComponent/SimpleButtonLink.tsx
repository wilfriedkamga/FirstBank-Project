import React from 'react';
import { Button, styled } from '@mui/material';
import clsx from 'clsx';

// Définir les styles pour le bouton en utilisant MUI's styled
const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'fontSize' && prop !== 'float' })<{ fontSize?: string; float?: 'left' | 'right' }>(
  ({ theme, fontSize, float }) => ({
    color: theme.palette.error.main, // Couleur rouge
    fontWeight: theme.typography.fontWeightBold,
    fontSize: fontSize || '12px', // Taille de texte dynamique
    textTransform: 'none',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline', // Soulignement au survol
    },
    '&.Mui-disabled': {
      color: theme.palette.text.disabled, // Couleur du texte lorsqu'il est désactivé
      cursor: 'not-allowed',
    },
    // Utiliser des styles conditionnels pour float
    ...(float === 'left' && { float: 'left' }),
    ...(float === 'right' && { float: 'right' }),
  })
);

type SimpleButtonLinkProps = {
  text: string;          // Texte du bouton
  onClick?: () => void;  // Fonction appelée au clic
  disabled?: boolean;    // État de désactivation
  float?: 'left' | 'right'; // Positionnement flottant du bouton
  fontSize?: string;     // Taille du texte
};

const SimpleButtonLink: React.FC<SimpleButtonLinkProps> = ({
  text,
  onClick,
  disabled = false,
  float = 'none', // Valeur par défaut pour float
  fontSize = '12px', // Valeur par défaut pour fontSize
}) => {
  // Utiliser clsx pour appliquer des classes conditionnelles
  const buttonClass = clsx({
    'float-left': float === 'left',
    'float-right': float === 'right',
  });

  return (
    <StyledButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      fontSize={fontSize}
      className={buttonClass}
    >
      {text}
    </StyledButton>
  );
};

export default SimpleButtonLink;
