import React, { ReactNode, forwardRef } from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// Define the interface for the props
interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: object;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  shadow?: string | number;
  sx?: object;
  title?: ReactNode | string | object;
}

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: 'divider',
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} title={title as ReactNode}  />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={title as ReactNode}
            
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
