import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import type { ObjectSchema } from "yup";
import { sharesAction } from "@/utils/data/posters";
import { useSupabaseClient, useToast } from "@/utils/hooks";

type Values = {
  amount: number;
  phone?: string;
};

const isShareAction = (action: string): action is ShareActions => {
  return ["deposit shares", "withdraw"].includes(action);
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
  const supabase = useSupabaseClient();
  const userPromise = supabase.auth.getUser();
  const { showToast } = useToast();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (isShareAction(action)) {
            await sharesAction(
              action as ShareActions,
              values.amount,
              values.phone!,
              userPromise
            );
            const actionText =
              action === "withdraw" ? "withdrawn" : "deposited";
            showToast(
              `Successfully ${actionText} Ksh. ${values.amount}`,
              "success"
            );
          }
        } catch (error: any) {
          showToast(error.toString(), "error");
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ submitForm, isSubmitting, isValid }) => (
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
              disabled={!isValid}
              onClick={submitForm}
            >
              {action}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
