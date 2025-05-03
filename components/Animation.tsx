import React, { ReactNode } from "react";

interface HoverTextProps {
  children: ReactNode;
  className?: string;
}

export const HoverText: React.FC<HoverTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`group relative inline-block ${className}`}>
      {children}
      <span
        className={`absolute bottom-[-10px] left-0 h-0 w-full bg-black transition-all duration-300 ease-in-out group-hover:h-0.5 dark:bg-white`}
      />
    </span>
  );
};
