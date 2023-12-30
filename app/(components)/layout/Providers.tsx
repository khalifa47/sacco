"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import Container from "@mui/material/Container";
import ToastProvider from "./Toast";
import ThemeRegistry from "./theme/ThemeRegistry";

export const Context = createContext<SupabaseClient | undefined>(undefined);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={supabase}>
      <ThemeRegistry>
        <ToastProvider>
          {segment ? <Container maxWidth="xl">{children}</Container> : children}
        </ToastProvider>
      </ThemeRegistry>
    </Context.Provider>
  );
};

export default Providers;
