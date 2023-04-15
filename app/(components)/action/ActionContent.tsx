import * as yup from "yup";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import SettingsForm from "./SettingsForm";
import RequestForm from "./RequestForm";

const frequencyToInitialAmount = {
  weekly: 1000,
  monthly: 10000,
  quarterly: 100000,
  yearly: 300000,
};

// TODO: Add confirm box for verifying transaction

// shares
export const DepositShares = ({ phone }: { phone: string }) => {
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(100001, "Amount cannot exceed Ksh. 100,000")
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
    <PaymentForm
      action="deposit shares"
      initialValues={{ amount: 1000, phone: phone }}
      validationSchema={validationSchema}
    />
  );
};

export const WithdrawShares = ({
  phone,
  sharesAmount,
}: {
  phone: string;
  sharesAmount: number;
}) => {
  // TODO: Deny withdrawal if there is a pending loan
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
    <PaymentForm
      action="withdraw"
      initialValues={{ amount: 100, phone: phone }}
      validationSchema={validationSchema}
    />
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
      <PaymentForm
        action="transfer"
        initialValues={{ amount: 100 }}
        validationSchema={
          selectedValue === "welfare"
            ? validationSchemaWelfare
            : validationSchemaOtherShares
        }
        sharesToWelfare={selectedValue === "welfare" ? true : false}
      />
    </>
  );
};

// loans
export const HistoryLoans = () => {};

export const RequestLoans = ({
  sharesAmount,
  outStandingLoan,
}: {
  sharesAmount: number;
  outStandingLoan: number;
}) => {
  return (
    <RequestForm
      sharesAmount={sharesAmount}
      outStandingLoan={outStandingLoan}
    />
  );
};

export const RepayLoans = ({
  phone,
  loanBalance,
}: {
  phone: string;
  loanBalance: number;
}) => {
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(loanBalance + 1, "Amount cannot exceed your loan Balance")
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
    <PaymentForm
      action="payment"
      initialValues={{ amount: 1000, phone: phone }}
      validationSchema={validationSchema}
    />
  );
};

// welfare
export const DepositWelfare = ({ phone }: { phone: string }) => {
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(100001, "Amount cannot exceed Ksh. 100,000")
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
    <PaymentForm
      action="deposit welfare"
      initialValues={{ amount: 1000, phone: phone }}
      validationSchema={validationSchema}
    />
  );
};

// all settings
export const Settings = ({
  action,
  frequency,
}: {
  action: Action;
  frequency: Frequency;
}) => {
  const validationSchema = yup.object({
    frequency: yup
      .string()
      .oneOf(
        ["weekly", "monthly", "quarterly", "yearly"],
        "Please select a valid option."
      )
      .required("Frequency is required."),
    amount: yup
      .number()
      .required("Amount is required.")
      .moreThan(999, "Amount cannot be less than Ksh. 1,000"),
  });
  return (
    <SettingsForm
      action={action}
      initialValues={{
        frequency: frequency,
        amount: frequencyToInitialAmount[frequency],
      }}
      validationSchema={validationSchema}
    />
  );
};
