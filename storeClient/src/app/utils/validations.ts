import * as yup from "yup";

export const validationSchema = [
  yup.object({
    fullName: yup.string().required("Full name is required"),
    addressOne: yup.string().required("Address line 1 is required"),
    addressTwo: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required(),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required(),
  }),
];

export const validationProductSchema = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  type: yup.string().required(),
  price: yup.number().required().moreThan(100),
  quantityInStock: yup.number().required().min(0),
  description: yup.string().required(),
  file: yup.mixed().when("pictureUrl", {
    is: (value: string) => !value,
    then: yup.mixed().required("Please provide an image"),
  }),
});
