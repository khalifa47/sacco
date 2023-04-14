import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "formik-mui";
import { useState } from "react";

// TODO: Add confirm box for verifying transaction

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
        amount: 1000,
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

export const WithdrawShares = ({
  phone,
  sharesAmount,
}: {
  phone: string;
  sharesAmount: number;
}) => {
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(0.6 * sharesAmount, "Amount cannot exceed 60% of your shares")
      .moreThan(99, "Amount cannot be less than Ksh. 100"),
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
        amount: 100,
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
              Withdraw
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export const TransferShares = ({ sharesAmount }: { sharesAmount: number }) => {
  type Choice = "welfare" | "other shares";
  const [selectedValue, setSelectedValue] = useState<Choice>("welfare");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as Choice);
  };

  // transfer to other share account or to welfare
  const validationSchemaWelfare = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(0.6 * sharesAmount, "Amount cannot exceed 60% of your shares")
      .moreThan(99, "Amount cannot be less than Ksh. 100"),
  });
  const validationSchemaOtherShares = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(0.6 * sharesAmount, "Amount cannot exceed 60% of your shares")
      .moreThan(99, "Amount cannot be less than Ksh. 100"),
    id: yup
      .string()
      .test({
        name: "is-valid-id",
        message: "Invalid ID number.",
        test: (value) => value?.length === 8,
      })
      .required("ID number is required."),
  });

  const TransferWelfare = () => {
    return (
      <Formik
        initialValues={{
          amount: 100,
        }}
        validationSchema={validationSchemaWelfare}
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

            {isSubmitting ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                size="small"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Transfer
              </Button>
            )}
          </Form>
        )}
      </Formik>
    );
  };

  const TransferOtherShares = () => {
    return (
      <Formik
        initialValues={{
          amount: 100,
          id: "",
        }}
        validationSchema={validationSchemaOtherShares}
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
              name="id"
              type="string"
              label="ID Number"
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
                Transfer
              </Button>
            )}
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "welfare"}
              onChange={handleChange}
              value="welfare"
            />
          }
          label="Transfer to Welfare"
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "other shares"}
              onChange={handleChange}
              value="other shares"
            />
          }
          label="Transfer to Other Shares Account"
        />
      </div>
      {selectedValue === "welfare" ? (
        <TransferWelfare />
      ) : (
        <TransferOtherShares />
      )}
    </>
  );
};

export const SettingShares = () => {};

// loans
export const HistoryLoans = () => {};

export const RequestLoans = () => {};

export const RepayLoans = () => {};

export const SettingLoans = () => {};

// welfare
export const DepositWelfare = () => {};

export const SettingWelfare = () => {};
