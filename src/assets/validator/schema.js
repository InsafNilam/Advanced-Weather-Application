import * as yup from "yup";

const passwordRules = /^(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).{8,}$/;
// Must Contain 8 Characters, One Uppercase, One Lowercase

export const signInSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Required"),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const basicSchema = yup.object().shape({
  latitude: yup
    .number()
    .min(-90, "latitude >= -90 degrees")
    .max(90, "latitude <= 90 degrees")
    .required("latitude is required"),
  longitude: yup
    .number()
    .min(-180, "longitude >= -180 degrees")
    .max(180, "logitude <= 180 degrees")
    .required("longitude is required"),
});
