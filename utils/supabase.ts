import { Context } from "@/app/(components)/layout/Providers";
import { useContext } from "react";

export const useSupabaseClient = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
