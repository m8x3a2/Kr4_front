// src/pages/Settings.js (обновленный с MUI и Snackbar)
import { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Snackbar,
  TextField // Для примера, если нужно
} from '@mui/material';
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
  const { 
    technologies,
    markAllCompleted, 
    resetAll, 
    clearAllNotes,
    setTechnologies
  } = useTechnologies();

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importError, setImportError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toLocaleString('ru-RU'),
      total: technologies.length,
      technologies
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setSnackbarMessage('Экспорт завершён!');
    setSnackbarOpen(true);
  };

  const processImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.technologies || !Array.isArray(data.technologies)) throw new Error('Неверный формат');
        setTechnologies(data.technologies);
        setSnackbarMessage('Импорт успешен!');
        setSnackbarOpen(true);
      } catch (err) {
        setImportError(err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') processImport(file);
    else setImportError('Только JSON');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) processImport(file);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Настройки</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>Управление</Typography>
        <Box sx={{ display: 'grid', gap: 1, maxWidth: 500 }}>
          <Button variant="contained" color="success" onClick={markAllCompleted}>Отметить все завершёнными</Button>
          <Button variant="contained" color="warning" onClick={resetAll}>Сбросить статусы</Button>
          <Button variant="contained" color="error" onClick={clearAllNotes}>Очистить заметки</Button>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>Экспорт/Импорт</Typography>
        <Box sx={{ display: 'grid', gap: 1, maxWidth: 500 }}>
          <Button variant="contained" color="primary" onClick={handleExport}>Экспорт JSON</Button>
          
          <Box
            sx={{
              border: `2px dashed ${isDragging ? 'primary.main' : 'divider'}`,
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              bgcolor: isDragging ? 'action.hover' : 'transparent'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Typography>Перетащите JSON или</Typography>
            <Button variant="outlined" onClick={() => fileInputRef.current.click()}>Выбрать файл</Button>
          </Box>

          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect} hidden />

          {importError && <Alert severity="error" sx={{ mt: 1 }}>{importError}</Alert>}
        </Box>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Paper>
  );
}

export default Settings;