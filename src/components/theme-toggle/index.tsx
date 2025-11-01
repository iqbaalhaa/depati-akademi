import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const theme = useMuiTheme();

  return (
    <Tooltip title={darkMode ? "Mode Terang" : "Mode Gelap"}>
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        sx={{
          ml: 1,
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
        }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;