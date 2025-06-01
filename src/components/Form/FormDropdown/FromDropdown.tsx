import {
  container,
  fieldLabel,
  inputWrapper,
  inputField,
  fieldError,
} from "./FormDropdown.css";

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

const generateLabelId = (label: string): string => {
  const baseId = label
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const suffix = Math.floor(Math.random() * 10000);
  return `${baseId}-${suffix}`;
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
