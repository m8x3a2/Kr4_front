import { useState } from 'react';
import { Button, Box, Snackbar, Alert, Typography } from '@mui/material'; // ← Typography добавлен
import Modal from './Modal';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  onSelectRandomNext,  
  onClearAllNotes,     
  technologies 
}) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      technologies
    };
    console.log('Экспортированные данные:', JSON.stringify(data, null, 2));
    setShowExportModal(true);
    setSnackbarMessage('Данные экспортированы в консоль!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6" gutterBottom>Быстрые действия</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button variant="contained" color="success" onClick={onMarkAllCompleted}>Отметить все завершёнными</Button>
        <Button variant="contained" color="warning" onClick={onResetAll}>Сбросить статусы</Button>
        <Button variant="contained" color="primary" onClick={handleExport}>Экспорт данных</Button>
        <Button variant="contained" color="secondary" onClick={onSelectRandomNext}>Случайная следующая</Button>
        <Button variant="contained" color="error" onClick={onClearAllNotes}>Очистить заметки</Button>
      </Box>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт завершён">
        <p>Данные успешно экспортированы!</p>
        <p>Откройте консоль разработчика (F12 → Console), чтобы увидеть JSON.</p>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default QuickActions;