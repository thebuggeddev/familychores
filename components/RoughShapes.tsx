import React from 'react';

export const RoughHeaderShape: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 60" fill="none" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full -z-10 ${className}`}>
    <path 
      d="M10,30 Q30,5 100,5 T190,30 Q195,45 150,55 T10,30 Z" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      fill="none"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export const RoughButtonShape: React.FC<{ className?: string, fill?: string }> = ({ className = '', fill="currentColor" }) => (
  <svg viewBox="0 0 300 80" fill="none" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full -z-10 ${className}`}>
    <path 
      d="M5,10 Q150,5 295,10 Q290,40 295,70 Q150,75 5,70 Q10,40 5,10 Z" 
      fill={fill}
    />
  </svg>
);

export const ScribbleButtonShape: React.FC<{ className?: string, fill?: string }> = ({ className = '', fill="currentColor" }) => (
  <svg viewBox="0 0 300 80" fill="none" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full -z-10 ${className}`}>
    {/* A jagged, marker-stroke style shape */}
    <path 
      d="M10,15 
         C 50,12, 100,5, 150,8 
         C 200,10, 250,5, 290,12 
         C 295,30, 298,50, 292,70 
         C 250,75, 200,68, 150,72 
         C 100,75, 50,70, 8,65 
         C 2,45, 5,25, 10,15 Z" 
      fill={fill}
    />
  </svg>
);

export const RoughCircle: React.FC<{ className?: string, color?: string }> = ({ className = '', color = "currentColor" }) => (
    <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
        <path d="M50 5 
           C 20 5, 5 20, 5 50 
           C 5 80, 20 95, 50 95 
           C 80 95, 95 80, 95 50 
           C 95 20, 80 5, 50 5 
           M 50 8 
           C 80 8, 92 20, 92 50 
           C 92 80, 80 92, 50 92 
           C 20 92, 8 80, 8 50 
           C 8 20, 20 8, 50 8" 
           fill="none" 
           stroke={color} 
           strokeWidth="2.5" 
           strokeLinecap="round" />
    </svg>
);

export const StrikeThrough: React.FC<{ className?: string }> = ({ className = '' }) => (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
        <path d="M5,15 Q50,5 100,10 T195,8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
);