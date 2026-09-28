import { ChangeEvent, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

export const TextInput = ({
  onChange,
  placeholder,
  value,
  maxLength,
  disabled,
  className = "",
  id,
  ...props
}: Props) => {
  return (
    <input
      type="text"
      id={id}
      className={`bg-white text-zinc-900 placeholder:text-zinc-500 py-2.5 px-3 rounded-md w-full transition focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      disabled={disabled}
      {...props}
    />
  );
};
