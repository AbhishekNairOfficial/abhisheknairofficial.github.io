import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      className={`h-[50px] px-[50px] py-[10px] rounded-md bg-primary text-white uppercase text-2xl tracking-[0.1em] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;