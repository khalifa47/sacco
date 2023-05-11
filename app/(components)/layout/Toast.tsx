"use client";

import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createContext, useEffect, useReducer, useState } from "react";

type ToastProps = {
  message: string;
  severity: AlertProps["severity"];
  open: boolean;
  handleClose?: () => void;
};

type ToastContextType = {
  toastState: ToastProps;
  showToast: (message: string, severity: ToastProps["severity"]) => void;
  hideToast: () => void;
};

type ToastAction =
  | { type: "SHOW_TOAST"; message: string; severity: ToastProps["severity"] }
  | { type: "HIDE_TOAST" };

const initialState: ToastProps = {
  message: "",
  severity: "success",
  open: false,
};

const toastReducer = (state: ToastProps, action: ToastAction): ToastProps => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        message: action.message,
        severity: action.severity,
        open: true,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export const ToastContext = createContext<ToastContextType>({
  toastState: initialState,
  showToast: () => {},
  hideToast: () => {},
});

const Toast: React.FC<ToastProps> = ({
  message,
  severity,
  open,
  handleClose,
}) => {
  const [progress, setProgress] = useState(0);

  const autoHideDuration = 6000;
  const delay = autoHideDuration / 100;

  useEffect(() => {
    if (!open) return;
    const start = Date.now();
    let timer: NodeJS.Timeout;

    const step = () => {
      const timeElapsed = Date.now() - start;

      if (timeElapsed >= autoHideDuration) {
        setProgress(100);
      } else {
        const progress = Math.min((timeElapsed / autoHideDuration) * 100, 100);
        setProgress(progress);
        timer = setTimeout(step, delay);
      }
    };

    timer = setTimeout(step, delay);

    return () => {
      clearInterval(timer);
    };
  }, [open, delay]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={severity}
        sx={{ position: "relative", width: "100%" }}
      >
        {message}
        {open && (
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={progress}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        )}
      </MuiAlert>
    </Snackbar>
  );
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastState, dispatch] = useReducer(toastReducer, initialState);

  const showToast = (message: string, severity: ToastProps["severity"]) => {
    dispatch({ type: "SHOW_TOAST", message, severity });
  };

  const hideToast = () => {
    dispatch({ type: "HIDE_TOAST" });
  };

  return (
    <ToastContext.Provider value={{ toastState, showToast, hideToast }}>
      <Toast {...toastState} handleClose={hideToast} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
