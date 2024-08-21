import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ClipLoader, CircleLoader, GridLoader } from 'react-spinners';

type SpinnerComponentProps = {
  size?: number;
  color?: string;
  duration?: number;
  isLoading?: boolean;
  shape?: 'clip' | 'circle' | 'grid'; // Types de spinners disponibles
};

const SpinnerComponent: React.FC<SpinnerComponentProps> = ({
  size = 10,
  color = '#123abc',
  duration = 3000,
  isLoading = true,
  shape = 'clip',
}) => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(isLoading);
    }, duration);

    return () => clearTimeout(timer);
  }, [isLoading, duration]);

  if (!loading) return null;

  return (
    <Box
      className="flex items-center justify-center "
    >
      {shape === 'circle' && (
        <CircleLoader color={color} loading={loading} size={size} />
      )}
      {shape === 'grid' && (
        <GridLoader color={color} loading={loading} size={size} />
      )}
      {shape === 'clip' && (
        <ClipLoader color={color} loading={loading} size={size} />
      )}
    </Box>
  );
};

export default SpinnerComponent;
