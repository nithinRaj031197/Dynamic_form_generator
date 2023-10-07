import React, { ReactNode } from "react";
import "./button.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, className, onClick, tabIndex, children }) => {
  return (
    <button tabIndex={tabIndex} type={type ?? "button"} className={` ${className} button`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
