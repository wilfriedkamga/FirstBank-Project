import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { SxProps } from '@mui/system';

// Types pour les props du composant Chip
interface ChipProps extends Omit<MuiChipProps, 'color'> {
  chipcolor?: 'secondary' | 'success' | 'error' | 'orange' | 'warning';
  sx?: SxProps;
  variant?: 'outlined' | 'filled';
  disabled?: boolean;
}

// ==============================|| CHIP ||============================== //

const Chip: React.FC<ChipProps> = ({ chipcolor, disabled, sx = {}, variant = 'filled', ...others }) => {
  const theme = useTheme();

  let defaultSX = {
    color: 'primary.main',
    bgcolor: 'primary.light',
    ':hover': {
      color: 'primary.light',
      bgcolor: 'primary.dark'
    }
  };

  let outlineSX = {
    color: 'primary.main',
    bgcolor: 'transparent',
    border: '1px solid',
    borderColor: 'primary.main',
    ':hover': {
      color: 'primary.light',
      bgcolor: 'primary.dark'
    }
  };

  switch (chipcolor) {
    case 'secondary':
      variant === 'outlined'
        ? (outlineSX = {
            color: 'secondary.main',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'secondary.main',
            ':hover': {
              color: 'secondary.main',
              bgcolor: 'secondary.light'
            }
          })
        : (defaultSX = {
            color: 'secondary.main',
            bgcolor: 'secondary.light',
            ':hover': {
              color: 'secondary.light',
              bgcolor: 'secondary.main'
            }
          });
      break;
    case 'success':
      variant === 'outlined'
        ? (outlineSX = {
            color: 'success.dark',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'success.dark',
            ':hover': {
              color: 'success.dark',
              bgcolor: alpha(theme.palette.success.light, 0.6)
            }
          })
        : (defaultSX = {
            color: 'success.dark',
            bgcolor: alpha(theme.palette.success.light, 0.6),
            ':hover': {
              color: 'success.light',
              bgcolor: 'success.dark'
            }
          });
      break;
    case 'error':
      variant === 'outlined'
        ? (outlineSX = {
            color: 'error.main',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'error.main',
            ':hover': {
              color: 'error.dark',
              bgcolor: 'error.light'
            }
          })
        : (defaultSX = {
            color: 'error.dark',
            bgcolor: alpha(theme.palette.error.light, 0.6),
            ':hover': {
              color: 'error.light',
              bgcolor: 'error.dark'
            }
          });
      break;
    case 'orange':
      variant === 'outlined'
        ? (outlineSX = {
            color: 'orange.dark',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'orange.main',
            ':hover': {
              color: 'orange.dark',
              bgcolor: 'orange.light'
            }
          })
        : (defaultSX = {
            color: 'orange.dark',
            bgcolor: 'orange.light',
            ':hover': {
              color: 'orange.light',
              bgcolor: 'orange.dark'
            }
          });
      break;
    case 'warning':
      variant === 'outlined'
        ? (outlineSX = {
            color: 'warning.dark',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'warning.dark',
            ':hover': {
              color: 'warning.dark',
              bgcolor: 'warning.light'
            }
          })
        : (defaultSX = {
            color: 'warning.dark',
            bgcolor: 'warning.light',
            ':hover': {
              color: 'warning.light',
              bgcolor: 'warning.dark'
            }
          });
      break;
    default:
  }

  if (disabled) {
    variant === 'outlined'
      ? (outlineSX = {
          color: 'grey.500',
          bgcolor: 'transparent',
          border: '1px solid',
          borderColor: 'grey.500',
          ':hover': {
            color: 'grey.500',
            bgcolor: 'transparent'
          }
        })
      : (defaultSX = {
          color: 'grey.500',
          bgcolor: 'grey.50',
          ':hover': {
            color: 'grey.500',
            bgcolor: 'grey.50'
          }
        });
  }

  let SX = defaultSX;
  if (variant === 'outlined') {
    SX = outlineSX;
  }
  

  return <MuiChip {...others} sx={SX} />;
};

export default Chip;
