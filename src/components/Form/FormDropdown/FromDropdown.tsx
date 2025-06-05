import {
  container,
  fieldLabel,
  inputWrapper,
  inputField,
  fieldError,
  customArrow,
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
        <span className={customArrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            viewBox="0 0 19 10"
            fill="none"
          >
            <path
              d="M1 1L9.5 9.5L18 1"
              stroke="#9a9a9a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </span>
        {error && <p className={fieldError}>{error}</p>}
      </div>
    </div>
  );
};

export default FormDropdown;
