"use client";

import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "./(components)/layout/Providers";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "98vh",
      }}
    >
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={300} />
      ) : (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          width={{ xs: "100%", md: "60%" }}
        >
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            width={{ xs: "100%", md: "40%" }}
            my={0}
            py={2}
            sx={{
              background: `linear-gradient(-45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="h3"
              mx={2}
              flexWrap="wrap"
              textAlign="center"
              color="white"
              fontWeight={700}
              letterSpacing={2}
              sx={{
                textShadow: "2px 2px 4px #000000",
                transform: { xs: "none", md: "rotate(-45deg)" },
              }}
            >
              KADHI SACCO
            </Typography>
          </Box>
          <Box alignItems="center" width={{ xs: "100%", md: "60%" }}>
            <Auth
              supabaseClient={supabase}
              providers={[]}
              redirectTo="/dashboard"
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
          </Box>
        </Box>
      )}
    </main>
  );
}
