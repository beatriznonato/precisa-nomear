import { HTMLInputTypeAttribute } from "react";
import Icon, { IconType } from "../../Icon/Icon";
import {
  container,
  fieldError,
  inputIcon,
  fieldLabel,
  inputWrapper,
  inputField,
} from "./FormField.css";

type FormFieldProps = {
  label: string;
  name: string;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  icon?: IconType;
  onIconClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export const FormField = ({
  label,
  placeholder,
  name,
  value,
  type = "text",
  error,
  icon,
  onIconClick,
  onChange,
  required = true,
  className,
}: FormFieldProps) => {
  const id = generateLabelId(label);

  return (
    <div className={`${container} ${className}`}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className={inputWrapper}>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={inputField}
          onChange={onChange}
          required={required}
          value={value}
        />
        {icon && (
          <Icon className={inputIcon} type={icon} onClick={onIconClick} />
        )}
      </div>
      <p className={fieldError}>{error}</p>
    </div>
  );
};

export default FormField;
