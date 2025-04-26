import React, { ReactNode } from 'react'

interface HoverTextProps {
    children: ReactNode;
    className?: string;
  }
  
export const HoverText: React.FC<HoverTextProps> = ({
    children,
    className = '',
    }) => {
    return (
        <span className={`relative inline-block group ${className}`}>
        {children}
        <span 
            className={`absolute left-0 bg-black dark:bg-white w-full h-0 bottom-[-10px] group-hover:h-0.5 duration-300 transition-all ease-in-out`}
        />
        </span>
    );
};