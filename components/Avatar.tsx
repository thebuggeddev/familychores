import React from 'react';
import { User } from '../types';

interface AvatarProps {
  user?: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  borderColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'md', showName = false, selected = false, onClick, className = '', borderColor }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  if (!user) return null;

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`} onClick={onClick}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Proper solid irregular border for selected/specific states */}
        {(selected || borderColor) && (
             <svg className="absolute -inset-1.5 w-[115%] h-[115%] rotate-12 z-10" viewBox="0 0 100 100">
                <path d="M50 5 C 20 5, 5 20, 5 50 C 5 80, 20 95, 50 95 C 80 95, 95 80, 95 50 C 95 20, 80 5, 50 5 Z" 
                      fill="none" 
                      stroke={borderColor || '#56AB5B'} 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                />
             </svg>
        )}
        
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-full h-full rounded-full object-cover border-2 border-white relative z-0"
        />

        {selected && (
            <div className="absolute -bottom-1 -right-1 bg-accentGreen rounded-full w-5 h-5 flex items-center justify-center border-2 border-white z-20">
                 <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                 </svg>
            </div>
        )}
      </div>
      {showName && <span className="text-xs font-bold text-gray-700">{user.name}</span>}
    </div>
  );
};

export default Avatar;