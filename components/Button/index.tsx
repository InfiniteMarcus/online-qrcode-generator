import { MouseEventHandler, ReactElement } from "react";

interface Props {
  children: string | ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export const Button = ({ children, onClick, type = "button", className = "", disabled }: Props) => {
  return (
    <button
      type={type}
      className={`bg-zinc-700 py-2 px-4 cursor-pointer hover:bg-zinc-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
