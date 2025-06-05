import { Dispatch, SetStateAction, useState } from "react";
import {
  filterContainer,
  filterIcon,
  selectPlaceholder,
  selectWrapper,
} from "./Filters.css";
import Icon from "../../../components/Icon/Icon";
import CustomSelect from "./CustomSelect";
import { getDisabilityLabel } from "../Table/UserTable";

export type FiltersType = {
  city: string;
  state: string;
  disability: string;
};

export type FilterOptions = {
  cities: string[];
  states: string[];
  disabilities: string[];
};

type FiltersProps = {
  filters: FiltersType;
  filterOptions: FilterOptions;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
};

const allFilters = [
  {
    value: "city",
    label: "Cidade",
  },
  {
    value: "state",
    label: "Estado",
  },
  {
    value: "disability",
    label: "Deficiência",
  },
];

const options = allFilters.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

const Filters = ({ filters, filterOptions, setFilters }: FiltersProps) => {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const cityOptions = filterOptions.cities.map((c) => ({ value: c, label: c }));
  const stateOptions = filterOptions.states.map((s) => ({
    value: s,
    label: s,
  }));
  const disabilityOptions = filterOptions.disabilities.map((d) => ({
    value: d,
    label: getDisabilityLabel(d),
  }));

  return (
    <div className={filterContainer}>
      {/* <div className={selectWrapper}> */}

      <CustomSelect
        filters={options}
        value={filterCategory}
        onChange={setFilterCategory}
        placeholder={
          <div className={selectWrapper}>
            <Icon className={filterIcon} type="filter" />
            <span className={selectPlaceholder}>Filtrar por</span>
          </div>
        }
      />

      {filterCategory === "city" && (
        <CustomSelect
          filters={cityOptions}
          value={filters.city}
          onChange={(val) => setFilters({ ...filters, city: val })}
          placeholder={
            <div className={selectWrapper}>
              <span className={selectPlaceholder}>Selecione uma cidade</span>
            </div>
          }
        />
      )}

      {filterCategory === "state" && (
        <CustomSelect
          filters={stateOptions}
          value={filters.state}
          onChange={(val) => setFilters({ ...filters, state: val })}
          placeholder={
            <div className={selectWrapper}>
              <span className={selectPlaceholder}>Selecione um estado</span>
            </div>
          }
        />
      )}

      {filterCategory === "disability" && (
        <CustomSelect
          filters={disabilityOptions}
          value={filters.disability}
          onChange={(val) => setFilters({ ...filters, disability: val })}
          placeholder={
            <div className={selectWrapper}>
              <span className={selectPlaceholder}>
                Selecione uma deficiência
              </span>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Filters;
