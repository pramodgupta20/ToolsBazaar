import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ReactNode, createContext, useContext, useState } from 'react';

type AppThemeProps = {
    children: ReactNode;
};

const ThemeContext = createContext<{ themeMode: string; setThemeMode: React.Dispatch<React.SetStateAction<string>> }>({
    themeMode: 'light',
    setThemeMode: () => { },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const AppTheme = ({ children }: AppThemeProps) => {
    const [themeMode, setThemeMode] = useState('light');
    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => useContext(ThemeContext);

export default AppTheme;
