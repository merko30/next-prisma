import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  containerClass?: string;
}

const Input = ({ label, containerClass, name, ...props }: InputProps) => {
  return (
    <div className={classNames("w-full", containerClass)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        className="w-full p-2 border border-gray-300 rounded-sm focus:outline-blue-500"
        name={name}
        {...props}
      />
    </div>
  );
};

export default Input;
