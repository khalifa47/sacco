import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import type { ObjectSchema } from "yup";
import {
  postContributionTransaction,
  postLoanTransaction,
} from "@/utils/data/posters";
import { useSupabaseClient, useToast } from "@/utils/hooks";
import { transferContribution } from "@/utils/data/patchers";
import type { LoanTransaction } from "@prisma/client";

type Values = {
  amount: number;
  phone?: string;
  nationalId?: string;
};

const isContributionDepWitAction = (action: string) => {
  return ["deposit shares", "withdraw", "deposit welfare"].includes(action);
};

const PaymentForm = ({
  action,
  initialValues,
  validationSchema,
  choice,
}: {
  action: Action;
  initialValues: Values;
  validationSchema: ObjectSchema<any>;
  choice?: TransferChoice;
}) => {
  const supabaseClient = useSupabaseClient();
  const { showToast } = useToast();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // if deposit or withdraw shares or deposit welfare
          if (isContributionDepWitAction(action)) {
            await postContributionTransaction(
              action as ShareActions | WelfareActions,
              values.amount,
              values.phone!,
              "mpesa",
              supabaseClient
            );
            const actionText =
              action === "withdraw" ? "withdrawn" : "deposited";
            showToast(
              `Successfully ${actionText} Ksh. ${values.amount} in ${
                isContributionDepWitAction(action) ? "shares" : "welfare"
              }`,
              "success"
            );
          } else if (action === "transfer") {
            await transferContribution(
              choice!,
              values.amount,
              supabaseClient,
              values.nationalId
            );
            const actionText =
              choice === "welfare"
                ? "welfare"
                : `National ID: ${values.nationalId}}`;
            showToast(
              `Successfully transferred shares to ${actionText}`,
              "success"
            );
          } else if (action === "payment") {
            const loanTransaction: LoanTransaction = await postLoanTransaction(
              values.amount,
              values.phone!,
              "mpesa",
              supabaseClient
            );
            showToast(
              `Successfully made loan payment of Ksh. ${values.amount}. Balance: Ksh. ${loanTransaction.balance}`,
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
            choice === "welfare" ? (
              <></>
            ) : (
              <Field
                component={TextField}
                color="secondary"
                name="nationalId"
                type="string"
                label="National ID"
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
