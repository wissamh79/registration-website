import * as yup from "yup";

export const conformSchema = yup
  .object({
    email: yup.string().email("Please enter a valid email").required(),
    phoneNumber: yup
      .string()
      .min(11)

      .required("Required"),
  })
  .required();
export const acceptedSchema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email("Please enter a valid email").required(),
    phoneNumber: yup
      .string()
      .min(11)

      .required("Required"),
  })
  .required();
