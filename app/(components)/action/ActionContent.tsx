import * as yup from "yup";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import SettingsForm from "./SettingsForm";
import RequestForm from "./RequestForm";
import DataTable from "../data/DataTable";
import type { Frequency } from "@prisma/client";
import type { LoanWithGuarantor } from "@/types/othTypes";

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
  const [choice, setChoice] = useState<TransferChoice>("welfare");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(event.target.value as TransferChoice);
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
    nationalId: yup
      .string()
      .test({
        name: "is-valid-id",
        message: "Invalid National ID.",
        test: (value) => value?.length === 8,
      })
      .required("National ID is required."),
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormControlLabel
          control={
            <Radio
              checked={choice === "welfare"}
              onChange={handleChange}
              value="welfare"
            />
          }
          label="Transfer to Welfare"
        />
        <FormControlLabel
          control={
            <Radio
              checked={choice === "other shares"}
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
          choice === "welfare"
            ? validationSchemaWelfare
            : validationSchemaOtherShares
        }
        choice={choice}
      />
    </>
  );
};

// loans
export const HistoryLoans = ({ loans }: { loans: LoanWithGuarantor[] }) => {
  return <DataTable rows={loans} />;
};

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
export const SettingsArea = ({
  action,
  initialValues,
}: {
  action: Action;
  initialValues: { frequency: Frequency; amount: number };
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
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};
