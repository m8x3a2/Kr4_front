// src/components/BulkEdit.jsx — полностью на MUI, тёмная тема работает!

import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack
} from '@mui/material';
import { useState } from 'react';

function BulkEdit({ selectedIds, onBulkUpdate, onClose }) {
  const [newStatus, setNewStatus] = useState('not-started');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBulkUpdate(selectedIds, newStatus);
    onClose();
  };

  return (
    <Paper
      elevation={12}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 420,
        width: '90vw',
        bgcolor: 'background.paper',   // ← автоматически тёмный/светлый фон
        color: 'text.primary',
      }}
    >
      <Typography variant="h5" component="h3" gutterBottom align="center">
        Массовое редактирование
      </Typography>

      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Выбрано технологий: <strong>{selectedIds.length}</strong>
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="bulk-status-label">Новый статус</InputLabel>
          <Select
            labelId="bulk-status-label"
            value={newStatus}
            label="Новый статус"
            onChange={(e) => setNewStatus(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="not-started">Не начато</MenuItem>
            <MenuItem value="in-progress">В процессе</MenuItem>
            <MenuItem value="completed">Изучено</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Применить
          </Button>

          <Button
            variant="contained"
            color="inherit"
            size="large"
            fullWidth
            onClick={onClose}
            sx={{ py: 1.5, bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.600' } }}
          >
            Отмена
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default BulkEdit;