import type { ChangeEventHandler } from "react";

export const NumberInput: React.FC<{
  name: string;
  placeholder: string | undefined;
  value?: string | number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  step: string | number;
  min: string | number;
  max?: string | number | undefined;
}> = ({ name, placeholder, value, onChange, step, min, max }) => {
  return (
    <input
      type="number"
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      step={step}
      min={min}
      max={max}
      className="block py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  );
};
