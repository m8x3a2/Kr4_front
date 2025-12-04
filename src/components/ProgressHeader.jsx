// src/components/ProgressHeader.jsx (обновленный с MUI)
import { Box, Typography, LinearProgress, Paper } from '@mui/material';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Прогресс изучения
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2, flexWrap: 'wrap' }}>
        <Typography variant="body1">Всего: <strong>{total}</strong></Typography>
        <Typography variant="body1">Изучено: <strong>{completed}</strong></Typography>
        <Typography variant="body1">Процент: <strong>{percentage}%</strong></Typography>
      </Box>

      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        color="secondary"
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Paper>
  );
}

export default ProgressHeader;