import { Context } from "@/app/(components)/layout/Providers";
import { ToastContext } from "@/app/(components)/layout/Toast";
import type { User } from "@prisma/client";
import { useContext, useCallback } from "react";
import { updateUser } from "./data/patchers";

export const useSupabaseClient = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

export const useToast = () => useContext(ToastContext);

export const useMutation = () => {
  return useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>(async (resolve, reject) => {
        if (!user.id || !user.firstName || !user.lastName) {
          reject("Names cannot be empty");
        } else {
          await updateUser(user.id, {
            firstName: user.firstName,
            otherNames: user.otherNames,
            lastName: user.lastName,
          })
            .catch((error) => {
              reject(error.toString() || "An error occurred");
            })
            .then(() => {
              resolve(user);
            });
        }
      }),
    []
  );
};
