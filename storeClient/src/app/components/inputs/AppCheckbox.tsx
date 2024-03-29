import { FormControlLabel, Checkbox } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

const AppCheckbox: React.FC<Props> = (props: Props) => {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={props.disabled}
          {...field}
          checked={field.value}
          color="secondary"
        />
      }
      label={props.label}
    />
  );
};

export default AppCheckbox;
