import React from 'react';
import MuiButton from '@mui/material/Button';

interface ButtonProps {
  text: any;
  color: any;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  color,
  className,
  onClick,
}) => {
  return (
    <MuiButton
      onClick={onClick}
      className={className}
      variant="contained"
      color={color}
    >
      {text}
    </MuiButton>
  );
};
