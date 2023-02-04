import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  containerProps?: object;
}

const Input = ({ label, containerProps, name, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
        </label>
      )}
      <input
        className="w-full p-2 border border-gray-300 rounded-sm"
        name={name}
        {...props}
      />
    </div>
  );
};

export default Input;
