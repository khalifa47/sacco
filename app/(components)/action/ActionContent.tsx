import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "formik-mui";

// shares
export const DepositShares = ({ phone }: { phone: string }) => {
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(100000, "Amount cannot exceed Ksh. 100,000")
      .moreThan(999, "Amount cannot be less than Ksh. 1,000"),
    phone: yup
      .string()
      .test({
        name: "is-valid-phone",
        message: "Invalid phone number",
        test: (value) => isValidSafaricomPhoneNumber(String(value)),
      })
      .required("Phone number is required."),
  });
  return (
    <Formik
      initialValues={{
        amount: 0,
        phone: phone,
      }}
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
          <Field
            component={TextField}
            color="secondary"
            name="phone"
            type="string"
            label="Phone Number"
          />

          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              size="small"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Deposit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export const WithdrawShares = () => {};

export const TransferShares = () => {};

export const SettingShares = () => {};

// loans
export const HistoryLoans = () => {};

export const RequestLoans = () => {};

export const RepayLoans = () => {};

export const SettingLoans = () => {};

// welfare
export const DepositWelfare = () => {};

export const SettingWelfare = () => {};
