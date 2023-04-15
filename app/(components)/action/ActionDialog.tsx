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
import { DepositShares, TransferShares, WithdrawShares } from "./ActionContent";

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
    case "deposit":
      return {
        contentText:
          "Enter an amount between Ksh. 1,000 and Ksh. 100,000 and the phone number that will be prompted to make the payment.",
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
