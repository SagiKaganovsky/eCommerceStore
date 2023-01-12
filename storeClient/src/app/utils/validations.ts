import * as yup from "yup";

export const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  addressOne: yup.string().required("Address line 1 is required"),
  addressTwo: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
});
