// src/components/Navigation.js (обновленный с MUI и переключателем темы)
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './Navigation.css'; // Сохраняем, но MUI переопределит

function Navigation({ toggleDarkMode, darkMode }) {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Трекер технологий
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Главная</NavLink>
          <NavLink to="/technologies" style={{ color: 'inherit', textDecoration: 'none' }}>Список</NavLink>
          <NavLink to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>Добавить</NavLink>
          <NavLink to="/statistics" style={{ color: 'inherit', textDecoration: 'none' }}>Статистика</NavLink>
          <NavLink to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>Настройки</NavLink>
          
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                icon={<LightModeIcon />}
                checkedIcon={<DarkModeIcon />}
              />
            }
            label="Тёмная тема"
            labelPlacement="start"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;