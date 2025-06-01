import { generateLabelId } from "../../../utils/generateLabelId";
import {
  container,
  radioError,
  radioInput,
  radioWrapper,
  radioLabel,
  radioContainer,
} from "./FormRadio.css"; // você pode copiar do checkbox e ajustar

type Option = {
  label: string;
  value: string;
};

type FormRadioProps = {
  label: string;
  name: string;
  value?: string;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const FormRadio = ({
  label,
  name,
  value,
  options,
  required = false,
  error,
  onChange,
  className,
}: FormRadioProps) => {
  const groupId = generateLabelId(label);

  return (
    <div className={`${container} ${className}`}>
      <p className={radioLabel}>{label}</p>
      <div className={radioContainer}>
        {options.map((opt) => {
          const id = `${groupId}-${opt.value}`;
          return (
            <div className={radioWrapper} key={opt.value}>
              <input
                type="radio"
                id={id}
                name={name}
                value={opt.value}
                checked={value === opt.value}
                required={required}
                onChange={onChange}
                className={radioInput}
              />
              <label htmlFor={id}>{opt.label}</label>
            </div>
          );
        })}
      </div>
      {error && <p className={radioError}>{error}</p>}
    </div>
  );
};

export default FormRadio;
