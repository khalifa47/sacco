import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import { capitalize } from "@/utils/helpers";
import type { ObjectSchema } from "yup";

type Values = {
  amount: number;
  phone?: string;
};

const PaymentForm = ({
  action,
  initialValues,
  validationSchema,
  sharesToWelfare,
}: {
  action: Action;
  initialValues: Values;
  validationSchema: ObjectSchema<any>;
  sharesToWelfare?: boolean;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Field
            component={TextField}
            color="secondary"
            name="amount"
            type="number"
            label="Amount"
          />
          {action === "transfer" ? (
            sharesToWelfare ? (
              <></>
            ) : (
              <Field
                component={TextField}
                color="secondary"
                name="id"
                type="string"
                label="ID Number"
              />
            )
          ) : (
            <Field
              component={TextField}
              color="secondary"
              name="phone"
              type="string"
              label="Phone Number"
            />
          )}

          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              size="small"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              {capitalize(action)}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
