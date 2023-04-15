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
  RepayLoans,
  DepositWelfare,
  SettingWelfare,
} from "./ActionContent";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getDialogContent = (
  action: Action
): { contentText: string; content: React.ReactNode } => {
  switch (action) {
    // shares
    case "deposit shares":
      return {
        contentText:
          "Deposit an amount between Ksh. 100 and Ksh. 100,000 to your shares account.",
        content: <DepositShares phone="254711144488" />,
      };
    case "withdraw":
      return {
        contentText:
          "Withdraw an amount between Ksh. 100 and (60% of your shares) to a specified phone number by MPESA.",
        content: <WithdrawShares sharesAmount={50000} phone="254711144488" />,
      };
    case "transfer":
      return {
        contentText:
          "Transfer an amount between Ksh. 100 and (60% of your shares) to welfare or another shares account.",
        content: <TransferShares sharesAmount={50000} />,
      };

    // loans
    case "payment":
      return {
        contentText: "Make a direct loan repayment.",
        content: <RepayLoans phone="254711144488" loanBalance={90000} />,
      };

    // welfare
    case "deposit welfare":
      return {
        contentText:
          "Deposit an amount between Ksh. 100 and Ksh. 100,000 to your welfare account.",
        content: <DepositWelfare phone="254711144488" />,
      };
    case "welfare settings":
      return {
        contentText: "Change your welfare frequncy settings.",
        content: <SettingWelfare frequency="monthly" />,
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
  open,
  handleClose,
}: {
  action: Action;
  open: boolean;
  handleClose: () => void;
}) => {
  const { contentText, content } = getDialogContent(action);
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
