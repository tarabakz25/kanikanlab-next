import React, { ReactNode } from "react";

interface HoverTextProps {
  children: ReactNode;
  className?: string;
}

export const HoverTextHeader: React.FC<HoverTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`group relative inline-block ${className}`}>
      {children}
      <span
        className={`absolute bottom-[-10px] left-0 h-0.5 w-0 dark:bg-white transition-all duration-300 ease-in-out group-hover:w-full`}
      />
    </span>
  );
};

export const HoverTextBreadcumbs: React.FC<HoverTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`group relative inline-block ${className}`}>
      {children}
      <span
        className={`absolute bottom-[-3px] left-0 h-[0.5px] w-0 dark:bg-white transition-all duration-300 ease-in-out group-hover:w-full`}
      />
    </span>
  )
}