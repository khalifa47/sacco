"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../(components)/layout/Providers";
import { useTheme } from "@mui/material/styles";

export default function LoginRegister() {
  const supabase = useSupabase();
  const theme = useTheme();

  return (
    <main>
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
    </main>
  );
}
