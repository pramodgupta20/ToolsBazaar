import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from './AppTheme';

function ThemeToggle() {
    const { themeMode, setThemeMode } = useThemeMode();

    const handleThemeToggle = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <IconButton color="inherit" onClick={handleThemeToggle}>
            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
    );
}

export default ThemeToggle;
