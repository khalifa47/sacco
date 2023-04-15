import * as yup from "yup";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import ActionForm from "./ActionForm";

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
    <ActionForm
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
    <ActionForm
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
      <ActionForm
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

export const SettingShares = () => {};

// loans
export const HistoryLoans = () => {};

export const RequestLoans = () => {};

export const RepayLoans = () => {};

export const SettingLoans = () => {};

// welfare
export const DepositWelfare = ({ phone }: { phone: string }) => {
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
    <ActionForm
      action="deposit welfare"
      initialValues={{ amount: 1000, phone: phone }}
      validationSchema={validationSchema}
    />
  );
};

export const SettingWelfare = () => {};
