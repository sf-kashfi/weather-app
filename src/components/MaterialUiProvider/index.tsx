import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ReactNode } from "react";

export interface MaterialUiProviderProps {
    children: ReactNode;
}

export const MaterialUiProvider: React.FunctionComponent<MaterialUiProviderProps> = (props) => {
    const { children } = props;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
