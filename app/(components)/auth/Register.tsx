import * as yup from "yup";

import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import { Children } from "react";

const nationalIdRegex = /^[0-9]{8}$/;

const initialValues = {
  nationalId: "",
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  otherNames: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object({
  nationalId: yup
    .string()
    .matches(nationalIdRegex, "Invalid National ID")
    .required("National ID is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  phone: yup
    .string()
    .test({
      name: "is-valid-phone",
      message: "Format: +254...",
      test: (value) => isValidSafaricomPhoneNumber(String(value)),
    })
    .required("Phone number is required."),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  otherNames: yup.string(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required."),
});

const RowField = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", width: "100%", gap: 10 }}>
    {Children.map(children, (child) => (
      <div style={{ width: "50%" }}>{child}</div>
    ))}
  </div>
);

const CustomizedField = ({
  name,
  label,
  isPassword,
}: {
  name: string;
  label: string;
  isPassword?: boolean;
}) => (
  <Field
    component={TextField}
    fullWidth
    size="small"
    name={name}
    color="secondary"
    {...(isPassword && { type: "password" })}
    label={label}
    FormHelperTextProps={{
      sx: { mt: 0, lineHeight: 1.2, display: { xs: "none", md: "block" } },
    }}
  />
);

const Register = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          alert(JSON.stringify(await res.json(), null, 2));
          // router.push("/dashboard");
        }

        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, isValid }) => (
        <Form
          style={{
            display: "flex",
            width: "80%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <RowField>
            <CustomizedField name="firstName" label="*First Name" />
            <CustomizedField name="lastName" label="*Last Name" />
          </RowField>

          <CustomizedField name="otherNames" label="Other Names" />

          <RowField>
            <CustomizedField name="nationalId" label="*National ID" />
            <CustomizedField name="phone" label="*Phone Number" />
          </RowField>

          <CustomizedField name="email" label="*Email" />

          <RowField>
            <CustomizedField name="password" label="*Password" isPassword />
            <CustomizedField
              name="confirmPassword"
              label="*Confirm Password"
              isPassword
            />
          </RowField>

          {isSubmitting ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              variant="contained"
              fullWidth
              disabled={!isValid}
              onClick={submitForm}
            >
              Register
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Register;

// TODO: handle exceptions
