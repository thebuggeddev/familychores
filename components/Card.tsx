import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, noPadding = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white border-[2.5px] border-black shape-hand shadow-hand
        ${noPadding ? '' : 'p-4'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;