import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface SortOption {
  value: string;
  label: string;
}
interface Props {
  sortOptions: SortOption[];
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sort: React.FC<Props> = ({
  sortOptions,
  selectedValue,
  handleChange,
}) => {
  return (
    <FormControl>
      <FormLabel id="sort-radio-buttons">Sort by</FormLabel>
      <RadioGroup
        aria-labelledby="sort-radio-buttons"
        name="sort-radio-buttons"
        value={selectedValue}
        onChange={handleChange}
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
