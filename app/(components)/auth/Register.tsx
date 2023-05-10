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
      message: "Invalid phone number",
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
  <div style={{ display: "flex", gap: 10 }}>
    {Children.map(children, (child) => (
      <div style={{ width: "50%" }}>{child}</div>
    ))}
  </div>
);

const Register = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        // const res = await fetch("/api/auth/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     isEmail: isEmail,
        //     identifier: values.identifier,
        //     password: values.password,
        //   }),
        // });

        // if (!res.ok) {
        //   throw new Error(await res.text());
        // } else {
        //   router.push("/dashboard");
        // }
        alert(JSON.stringify(values, null, 2));
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
            <Field
              component={TextField}
              size="small"
              name="firstName"
              color="secondary"
              label="*First Name"
            />
            <Field
              component={TextField}
              size="small"
              name="lastName"
              color="secondary"
              label="*Last Name"
            />
          </RowField>

          <Field
            component={TextField}
            size="small"
            fullWidth
            name="otherNames"
            color="secondary"
            label="Other Names"
          />

          <RowField>
            <Field
              component={TextField}
              size="small"
              fullWidth
              name="nationalId"
              color="secondary"
              label="*National ID"
            />
            <Field
              component={TextField}
              size="small"
              fullWidth
              name="phone"
              color="secondary"
              label="*Phone"
            />
          </RowField>
          <Field
            component={TextField}
            size="small"
            fullWidth
            name="email"
            color="secondary"
            label="*Email"
          />

          <RowField>
            <Field
              component={TextField}
              size="small"
              fullWidth
              color="secondary"
              type="password"
              name="password"
              label="*Password"
            />
            <Field
              component={TextField}
              size="small"
              fullWidth
              color="secondary"
              type="password"
              name="confirmPassword"
              label="*Confirm Password"
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

// TODO: make responsive for smaller screens

// TODO: add API auth for register
