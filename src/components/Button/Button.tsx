import React, { ReactNode } from "react";
import "./button.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick: () => void;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children }) => {
  return (
    <button type={type ?? "button"} className={` ${className} button`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
