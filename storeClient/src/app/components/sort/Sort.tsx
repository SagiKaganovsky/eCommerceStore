import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";

interface SortOption {
  value: string;
  label: string;
}

const Sort: React.FC<{
  sortOptions: SortOption[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ sortOptions, handleChange }) => {
  const [selectedValue, setSelectedValue] = useState(sortOptions[0].value);
  return (
    <FormControl>
      <FormLabel id="sort-radio-buttons">Sort by</FormLabel>
      <RadioGroup
        aria-labelledby="sort-radio-buttons"
        name="sort-radio-buttons"
        value={selectedValue}
        onChange={(e) => {
          handleChange(e);
          setSelectedValue(e.target.value);
        }}
      >
        {sortOptions.map((option) => {
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default Sort;
