import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type AppThemeProps = {
  children: ReactNode;
};

export default function AppTheme({ children }: AppThemeProps) {
  const theme = createTheme({});

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
