"use client";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { capitalize } from "@/utils/helpers";
import {
  DepositShares,
  TransferShares,
  WithdrawShares,
  RequestLoans,
  RepayLoans,
  DepositWelfare,
  SettingsArea,
  HistoryLoans,
} from "./ActionContent";
import type { LoanWithGuarantor, Settings } from "@/types/othTypes";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getDialogContent = (
  action: Action,
  settings: Settings,
  loans: LoanWithGuarantor[],
  phone: string
): { contentText: string; content: JSX.Element } => {
  switch (action) {
    // shares
    case "deposit shares":
      return {
        contentText:
          "Deposit an amount between Ksh. 100 and Ksh. 100,000 to your shares account.",
        content: <DepositShares phone={phone} />,
      };
    case "withdraw":
      return {
        contentText:
          "Withdraw an amount between Ksh. 100 and (60% of your shares) to a specified phone number by MPESA.",
        content: <WithdrawShares sharesAmount={50000} phone={phone} />,
      };
    case "transfer":
      return {
        contentText:
          "Transfer an amount between Ksh. 100 and (60% of your shares) to welfare or another shares account.",
        content: <TransferShares sharesAmount={50000} />,
      };
    case "share settings":
      return {
        contentText: "Change your shares depositing frequency settings.",
        content: (
          <SettingsArea action="share settings" initialValues={settings} />
        ),
      };

    // loans
    case "loan history":
      return {
        contentText: "View your loan history.",
        content: <HistoryLoans loans={loans} />,
      };
    case "request":
      return {
        contentText:
          "Apply for a loan. The guarantor you select will be notified.",
        content: <RequestLoans sharesAmount={50000} outStandingLoan={10000} />,
      };
    case "payment":
      return {
        contentText: "Make a direct loan repayment.",
        content: <RepayLoans phone={phone} loanBalance={90000} />,
      };
    // case "loan settings":
    //   return {
    //     contentText: "Change your loan repayment frequency settings.",
    //     content: (
    //       <SettingsArea action="loan settings" initialValues={settings} />
    //     ),
    //   };

    // TODO: can keep loan settings if idea is to change loan settings for all active loans

    // welfare
    case "deposit welfare":
      return {
        contentText:
          "Deposit an amount between Ksh. 100 and Ksh. 100,000 to your welfare account.",
        content: <DepositWelfare phone={phone} />,
      };
    case "welfare settings":
      return {
        contentText: "Change your welfare frequency settings.",
        content: (
          <SettingsArea action="welfare settings" initialValues={settings} />
        ),
      };
    default:
      return {
        contentText: "",
        content: <></>,
      };
  }
};

const ActionDialog = ({
  action,
  phone,
  loans,
  settings,
  open,
  handleClose,
}: {
  action: Action;
  phone?: string;
  loans: LoanWithGuarantor[];
  settings: Settings;
  open: boolean;
  handleClose: () => void;
}) => {
  const { contentText, content } = getDialogContent(
    action,
    settings,
    loans,
    phone || ""
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <DialogTitle>{capitalize(action)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
