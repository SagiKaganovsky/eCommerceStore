import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

const FiltersList: React.FC<{
  list: string[];
  label: string;
  handleChange: (item: string) => void;
}> = ({ list, label, handleChange }) => {
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {list.map((item) => {
          return (
            <FormControlLabel
              key={item}
              control={
                <Checkbox onChange={() => handleChange(item)} name={item} />
              }
              label={item}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default FiltersList;
