import * as yup from "yup";

import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/hooks";

const nationalIdRegex = /^[0-9]{8}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validationSchema = yup.object({
  identifier: yup
    .string()
    .required("Email or National ID is required")
    .test({
      name: "is-valid-identifier",
      message: "Invalid Email or national ID",
      test: (value) => nationalIdRegex.test(value) || emailRegex.test(value),
    }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required."),
});

const Login = () => {
  const router = useRouter();
  const { showToast } = useToast();
  return (
    <Formik
      initialValues={{ identifier: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const isEmail = emailRegex.test(values.identifier);

        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              isEmail: isEmail,
              ...values,
            }),
          });

          if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg === "" ? res.statusText : msg);
          } else {
            router.push("/dashboard");
            showToast("Logged in successfully", "success");
          }
        } catch (error: any) {
          showToast(error.toString(), "error");
        } finally {
          setSubmitting(false);
        }
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
