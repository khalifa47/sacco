"use client";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { capitalize } from "@/utils/helpers";

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
      <DialogContent>{/* dialog content here */}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
