import { HTMLInputTypeAttribute } from "react";
import {
  container,
  fieldLabel,
  inputWrapper,
  inputField,
  fieldError,
} from "./FormDropdown.css";
import { generateLabelId } from "../../../utils/generateLabelId";

type Option = {
  label: string;
  value: string;
};

type FormDropdownProps = {
  label: string;
  name: string;
  value?: string;
  required?: boolean;
  options: Option[];
  placeholder?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export const FormDropdown = ({
  label,
  name,
  value,
  required = true,
  options,
  placeholder = "Selecionar",
  onChange,
  error,
  className,
}: FormDropdownProps) => {
  const id = generateLabelId(label);

  return (
    <div className={`${container} ${className}`}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className={inputWrapper}>
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={inputField}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className={fieldError}>{error}</p>}
      </div>
    </div>
  );
};

export default FormDropdown;
