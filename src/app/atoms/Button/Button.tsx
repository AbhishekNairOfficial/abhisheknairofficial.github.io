import { JSX } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-[50px] px-[50px] py-[10px] rounded-md bg-primary text-white uppercase text-2xl tracking-[0.1em] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;