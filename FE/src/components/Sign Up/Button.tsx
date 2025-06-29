"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "social";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full text-base font-bold text-center rounded-lg px-16 py-4";

  const variantStyles = {
    primary: "bg-teal-500 text-white",
    secondary: "bg-white text-gray-700 border border-gray-300",
    outline: "bg-transparent text-teal-700 border border-teal-500",
    social: "bg-white text-gray-700 border border-gray-300",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
