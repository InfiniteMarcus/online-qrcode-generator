import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-zinc-700 text-white font-medium py-2.5 px-4 rounded-md cursor-pointer transition duration-150 hover:bg-zinc-200 hover:text-zinc-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
