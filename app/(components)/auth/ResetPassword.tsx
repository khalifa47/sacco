import * as yup from "yup";

import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const nationalIdRegex = /^[0-9]{8}$/;

const validationSchema = yup.object({
  identifier: yup
    .string()
    .required("Email or National ID is required")
    .test({
      name: "is-valid-identifier",
      message: "Invalid Email or national ID",
      test: (value) => nationalIdRegex.test(value) || emailRegex.test(value),
    }),
});

const ResetPassword = () => {
  return (
    <Formik
      initialValues={{ identifier: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const isEmail = emailRegex.test(values.identifier);

        // const res = await fetch("/api/auth/reset", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     isEmail: isEmail,
        //     identifier: values.identifier,
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
          <Field
            component={TextField}
            fullWidth
            name="identifier"
            color="secondary"
            label="Email or National ID"
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
              Send Password Reset Email
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;

// TODO: add API auth for email reset password
