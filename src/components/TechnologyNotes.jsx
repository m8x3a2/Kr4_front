// src/components/TechnologyNotes.jsx — КРАСИВО В ТЁМНОЙ И СВЕТЛОЙ ТЕМЕ

import { Box, TextField, Typography } from '@mui/material';

function TechnologyNotes({ notes, onNotesChange, techId }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
        Мои заметки:
      </Typography>

      <TextField
        multiline
        minRows={3}
        maxRows={6}
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты, ссылки, инсайты..."
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 2,
            '& fieldset': { borderColor: 'divider' },
            '&:hover fieldset': { borderColor: 'primary.main' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
          },
          '& textarea': {
            color: 'text.primary',
            fontSize: '0.95rem',
          }
        }}
      />

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {notes ? `Заметка сохранена (${notes.length} симв.)` : 'Заметок пока нет'}
      </Typography>
    </Box>
  );
}

export default TechnologyNotes;