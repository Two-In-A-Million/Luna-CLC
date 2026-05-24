import Select from "react-select";
import { useMemo } from "react";

interface SearchableSelectProps {
  data: any[];
  valueKey: string;
  labelKey: string;
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
}

export default function SearchableSelect({
  data,
  valueKey,
  labelKey,
  value,
  onChange,
  placeholder
}: SearchableSelectProps) {

  const options = useMemo(() => {
    return data.map(item => ({
      value: item[valueKey],
      label: `${item[valueKey]} - ${item[labelKey]}`
    }));
  }, [data, valueKey, labelKey]);

  const selectedOption =
    options.find(opt => opt.value === value) || null;

  const handleChange = (option: any) => {
    onChange(option ? option.value : null);
  };

  //harus pake ini kalau ga ga bisa
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "#222244",
      borderColor: state.isFocused ? "#ffd700" : "#3a3a5c",
      boxShadow: "none",
      color: "#eaf6ff",
      minHeight: "42px",
      fontFamily: '"VT323", monospace',
      "&:hover": {
        borderColor: "#ffd700"
      }
    }),

    menu: (base: any) => ({
      ...base,
      backgroundColor: "#1a1a2e",
      border: "1px solid #3a3a5c",
      zIndex: 9999
    }),

    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3a3a5c"
        : state.isFocused
        ? "#2a2a4a"
        : "#1a1a2e",
      color: state.isSelected ? "#ffd700" : "#eaf6ff",
      cursor: "pointer",
    }),
    
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999
    }),

    singleValue: (base: any) => ({
      ...base,
      color: "#eaf6ff"
    }),

    placeholder: (base: any) => ({
      ...base,
      color: "#8888aa"
    }),

    input: (base: any) => ({
      ...base,
      color: "#eaf6ff"
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#eaf6ff",
      "&:hover": {
        color: "#ffd700"
      }
    })
  };


  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isSearchable
        placeholder={placeholder}
        styles={customStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuPlacement="auto"
      />
    </div>
  );
}
