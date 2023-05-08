import * as yup from "yup";

import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";

import type { SupabaseClient } from "@supabase/supabase-js";

const nationalIdRegex = /^[0-9]{8}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validationSchema = yup.object({
  identifier: yup
    .string()
    .required("Email or National ID is required")
    .test({
      name: "is-valid-identifier",
      message: "Invalid email or national ID",
      test: (value) => nationalIdRegex.test(value) || emailRegex.test(value),
    }),
  password: yup.string().required("Password is required."),
});

const Login = ({ supabase }: { supabase?: SupabaseClient }) => {
  return (
    <Formik
      initialValues={{ identifier: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const isEmail = emailRegex.test(values.identifier);
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
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
          <Field
            component={TextField}
            fullWidth
            name="identifier"
            color="secondary"
            label="National ID or Email"
          />
          <Field
            component={TextField}
            fullWidth
            color="secondary"
            type="password"
            name="password"
            label="Password"
          />

          {isSubmitting ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              variant="contained"
              fullWidth
              disabled={!isValid}
              onClick={submitForm}
            >
              Login
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
