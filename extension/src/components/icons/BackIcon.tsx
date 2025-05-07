import React from 'react';

interface BackIconProps {
  className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ className }) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M6.67 3.33L2 8.00L6.67 12.67M2 8.00H14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackIcon; 
 
 
 
 
 