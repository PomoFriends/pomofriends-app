import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`my-2 py-2.5 text-xl leading-5 font-bold text-white px-4 rounded-lg ${className}`}
    >
      {text}
    </button>
  );
};
