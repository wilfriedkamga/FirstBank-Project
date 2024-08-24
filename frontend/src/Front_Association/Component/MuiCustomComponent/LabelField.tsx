import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Définir les styles pour le label en utilisant MUI's styled
const StyledLabel = styled(Typography, { shouldForwardProp: (prop) => prop !== 'marginBottom' })<{
  marginBottom?: string;
}>(({ theme, marginBottom }) => ({
  display: 'block',
  marginBottom: marginBottom || theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '14px',
  // Optionnel: utiliser les variables Tailwind CSS pour une personnalisation plus poussée
  '@media (min-width: 1024px)': {
    marginBottom: marginBottom || theme.spacing(2),
  },
}));

type LabelFieldProps = {
  text: string;           // Texte du label
  marginBottom?: string;
  hiddenStar?:boolean  // Marge inférieure
};

const LabelField: React.FC<LabelFieldProps> = ({
  text,
  marginBottom = '8px',
  hiddenStar=false // Valeur par défaut pour marginBottom
}) => {
  return (
    <StyledLabel
      variant="body1" // Utiliser une variante de MUI Typography
      marginBottom={marginBottom}
    >
      {text} 
      
      <label hidden={hiddenStar} className="text-red-600">
          *
        </label>
    </StyledLabel>
  );
};

export default LabelField;
