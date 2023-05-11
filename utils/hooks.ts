import { Context } from "@/app/(components)/layout/Providers";
import { ToastContext } from "@/app/(components)/layout/Toast";
import { useContext } from "react";

export const useSupabaseClient = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

export const useToast = () => useContext(ToastContext);
