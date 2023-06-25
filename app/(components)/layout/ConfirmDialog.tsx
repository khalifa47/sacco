"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { computeMutation } from "@/utils/helpers";

const ConfirmDialog = ({
  promiseArgs,
  handleNo,
  handleYes,
}: {
  promiseArgs: any;
  handleNo: () => void;
  handleYes: () => void;
}) => {
  if (!promiseArgs) {
    return null;
  }

  const { newRow, oldRow } = promiseArgs;
  const mutation = computeMutation(newRow, oldRow);
  return (
    <Dialog open={!!promiseArgs} fullWidth maxWidth="xs">
      <DialogTitle>Are you Sure?</DialogTitle>
      <DialogContent
        dividers
      >{`Pressing 'Yes' will change ${mutation}.`}</DialogContent>
      <DialogActions>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
