// src/App.js — ФИНАЛЬНАЯ ВЕРСИЯ (всё работает идеально + тёмная тема 100%)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Button } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import AddTechnology from './pages/AddTechnology';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useTechnologiesApi from './hooks/useTechnologiesApi';

import './App.css';
import { useState, useMemo, useEffect } from 'react'; // ← useEffect добавлен!

function App() {
  const { technologies, loading, error, refetch } = useTechnologiesApi();
  const [darkMode, setDarkMode] = useState(false);

  // Синхронизация атрибута data-theme для CSS-фича
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: '#3498db' },
          secondary: { main: '#27ae60' },
          error: { main: '#e74c3c' },
          background: {
            default: darkMode ? '#0a0e17' : '#f5f7fa',
            paper: darkMode ? '#1a2332' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '16px',
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0, 0, 0, 0.5)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : '#ffffff',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s ease',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
                backdropFilter: 'blur(10px)',
              },
            },
          },
          MuiButton: {
            styleOverrides: { root: { borderRadius: '8px', textTransform: 'none' } },
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}>
          <Box sx={{
            width: 64,
            height: 64,
            border: '6px solid',
            borderColor: 'divider',
            borderTopColor: 'primary.main',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            mb: 3
          }} />
          <Box component="p" sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
            Загрузка технологий...
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Router>
        <Navigation toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        {error && (
          <Box sx={{
            bgcolor: 'error.main',
            color: 'error.contrastText',
            p: 2.5,
            textAlign: 'center',
            fontSize: '1.1rem',
            fontWeight: 500
          }}>
            Ошибка загрузки данных: {error}
            <Button
              variant="contained"
              onClick={refetch}
              sx={{ ml: 2, bgcolor: 'common.white', color: 'error.main' }}
            >
              Попробовать снова
            </Button>
          </Box>
        )}

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList technologies={technologies} />} />
            <Route path="/technologies/:id" element={<TechnologyDetail technologies={technologies} />} />
            <Route path="/add" element={<AddTechnology />} />
            <Route path="/statistics" element={<Statistics technologies={technologies} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;