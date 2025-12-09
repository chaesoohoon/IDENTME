import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyles = "relative overflow-hidden font-bold rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group";
  
  // 3D & Shine Effects
  const primaryStyle = `
    bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
    shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] 
    hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.6)] 
    hover:-translate-y-1
    border-t border-white/20
  `;
  
  const secondaryStyle = `
    bg-white text-gray-800 
    hover:bg-gray-50 border border-gray-200 
    hover:border-violet-200 hover:text-violet-700 hover:shadow-lg hover:-translate-y-1
  `;
  
  const outlineStyle = "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white";

  const appliedStyle = variant === 'primary' ? primaryStyle : (variant === 'secondary' ? secondaryStyle : outlineStyle);

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${appliedStyle} ${className}`}
    >
      {/* Shine effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
      )}
      <span className="relative z-10">{children}</span>
      <style>{`
        @keyframes shine {
            100% { transform: translateX(100%); }
        }
        .group-hover\\:animate-shine {
            animation: shine 1s;
        }
      `}</style>
    </button>
  );
};