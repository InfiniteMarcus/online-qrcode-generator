import { ChangeEvent } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
}

export const TextInput = ({ onChange, placeholder, value, maxLength, disabled }: Props) => {
  return (
    <input
      type="text"
      className="bg-white py-2 px-2 text-black w-full disabled:opacity-50 disabled:cursor-not-allowed"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
};
