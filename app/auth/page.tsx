"use client";

import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../(components)/layout/Providers";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

export default function LoginRegister() {
  const supabase = useSupabase();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Wait for 1.2 seconds before showing the Auth component

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main>
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={300} />
      ) : (
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: theme.palette.primary.main,
                  brandAccent: theme.palette.primary.dark,
                },
                fonts: {
                  bodyFontFamily: theme.typography.fontFamily,
                  buttonFontFamily: theme.typography.fontFamily,
                  inputFontFamily: theme.typography.fontFamily,
                  labelFontFamily: theme.typography.fontFamily,
                },
              },
            },
          }}
        />
      )}
    </main>
  );
}
