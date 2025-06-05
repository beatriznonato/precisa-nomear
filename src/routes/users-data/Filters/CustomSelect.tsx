import Select from "react-select";
import { themeVars } from "../../../theme.css";
import { select } from "./Filters.css";

type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  filters: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: React.ReactNode;
};

const CustomSelect = ({
  filters,
  value,
  onChange,
  placeholder,
}: CustomSelectProps) => {
  return (
    <Select
      className={select}
      options={filters}
      isSearchable={false}
      placeholder={placeholder}
      value={filters.find((opt) => opt.value === value) || null}
      onChange={(opt) => onChange(opt ? opt.value : "")}
      isClearable
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: "transparent",
          boxShadow: state.isFocused ? "none" : "none",
          "&:hover": {
            borderColor: "none",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? themeVars.color.background1
            : themeVars.color.white,
          color: themeVars.color.black,
          fontFamily: themeVars.font.family.text,
          fontSize: themeVars.font.size.hint,
          cursor: "pointer",
          "&:active": {
            backgroundColor: themeVars.color.background1,
            color: "inherit",
          },
        }),
        singleValue: (base) => ({
          ...base,
          fontFamily: themeVars.font.family.text,
          fontSize: themeVars.font.size.hint,
          fontWeight: 500,
          color: themeVars.color.primary,
          textTransform: "uppercase",
        }),
        placeholder: (base) => ({ ...base, fontWeight: "bold" }),
      }}
    />
  );
};

export default CustomSelect;
