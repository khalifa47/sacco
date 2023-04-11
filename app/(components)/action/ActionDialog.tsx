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
import { DepositShares } from "./ActionContent";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionDialog = ({
  action,
  open,
  handleClose,
}: {
  action: Action;
  open: boolean;
  handleClose: () => void;
}) => {
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
        <DialogContentText>
          Enter an amount between Ksh. 1,000 and Ksh. 100,000 and the phone
          number that will be prompted to make the payment.
        </DialogContentText>
        <DepositShares phone="254711144488" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
