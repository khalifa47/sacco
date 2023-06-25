"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ConfirmDialog = ({
  open,
  handleNo,
  handleYes,
  content,
}: {
  open: boolean;
  handleNo: () => void;
  handleYes: () => void;
  content: string;
}) => {
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>Are you Sure?</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
