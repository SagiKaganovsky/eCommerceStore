import { Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/inputs/AppCheckbox";
import AppTextInput from "../../app/components/inputs/AppTextInput";

const AddressForm: React.FC = () => {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name="fullName" label="Full name" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="addressOne"
            label="Address line 1"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="addressTwo"
            label="Address line 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="state"
            label="State/Province/Region"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="postalCode"
            label="Zip / Postal code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="Country" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
          disabled={!formState.isDirty}
            name="saveAddress"
            label="Save this as the default address"
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
