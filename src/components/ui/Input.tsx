"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full relative group">
        {label && (
          <label 
            htmlFor={id} 
            className="text-sm uppercase font-display font-bold text-cyber-purple mb-2 group-focus-within:text-neon-cyan transition-colors"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`bg-void border border-cyber-purple/50 rounded h-12 px-4 py-2 text-ice font-sans placeholder:text-white/20 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300 ${className}`}
          {...props}
        />
        {/* Animated corner accent */}
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-focus-within:border-neon-cyan transition-colors duration-300 pointer-events-none rounded-br" />
      </div>
    );
  }
);

Input.displayName = "Input";
