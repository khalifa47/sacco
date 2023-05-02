"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import { ThemeProvider, createTheme } from "@mui/material";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F4641F",
    },
  },
});

const Context = createContext<SupabaseClient | undefined>(undefined);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

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
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">{children}</Container>
      </ThemeProvider>
    </Context.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

export default Providers;
