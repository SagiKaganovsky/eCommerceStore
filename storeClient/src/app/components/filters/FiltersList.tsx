import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

interface Props {
  list: string[];
  checkedList?: string[];
  label: string;
  handleChange: (items: string[]) => void;
}

const FiltersList: React.FC<Props> = ({
  list,
  checkedList,
  label,
  handleChange,
}) => {
  const [checkedItems, setCheckedItems] = useState(checkedList || []);

  const checkedHandler = (value: string) => {
    let newCheckedItems: string[] = [];
    const itemIndex = checkedItems.findIndex((item) => item === value);
    if (itemIndex === -1) {
      newCheckedItems = [...checkedItems, value];
    } else {
      newCheckedItems = checkedItems.filter((item) => item !== value);
    }
    handleChange(newCheckedItems);
    setCheckedItems(newCheckedItems);
  };
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {list.map((item) => {
          return (
            <FormControlLabel
              key={item}
              control={
                <Checkbox onChange={() => checkedHandler(item)} name={item} />
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
