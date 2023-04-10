"use client";

import Dialog from "@mui/material/Dialog";

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
    <Dialog open={open} onClose={handleClose}>
      {action}
    </Dialog>
  );
};

export default ActionDialog;
