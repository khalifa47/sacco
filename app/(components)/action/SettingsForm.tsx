import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField, Select } from "formik-mui";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import type { ObjectSchema } from "yup";
import type { Frequency } from "@prisma/client";

type Values = {
  frequency: Frequency;
  amount: number;
};

const SettingsForm = ({
  action,
  initialValues,
  validationSchema,
}: {
  action: Action;
  initialValues: Values;
  validationSchema: ObjectSchema<any>;
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
      {({ submitForm, isSubmitting, values, isValid }) => (
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
            component={Select}
            color="secondary"
            name="frequency"
            type="string"
            label="Frequency"
            formHelperText={{
              children:
                "How often would you like to be notified about a payment?",
            }}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Field>
          <Field
            component={TextField}
            color="secondary"
            name="amount"
            type="number"
            label="Amount"
            validate={(amount: number) => {
              if (values.frequency === "weekly") {
                if (amount > 10000)
                  return "Amount cannot be more than 10,000 for the selected frequency";
              } else if (values.frequency === "monthly") {
                if (amount > 100000 || amount < 10000)
                  return "Amount cannot be less than 10,000 or more than 100,000 for the selected frequency";
              } else if (values.frequency === "quarterly") {
                if (amount > 300000 || amount < 100000)
                  return "Amount cannot be less than 100,000 or more than 300,000 for the selected frequency";
              } else if (values.frequency === "yearly") {
                if (amount > 1000000 || amount < 300000)
                  return "Amount cannot be less than 300,000 or more than 1,000,000 for the selected frequency";
              }
            }}
          />

          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              size="small"
              disabled={!isValid}
              onClick={submitForm}
            >
              {`Update ${action}`}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;
