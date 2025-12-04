// src/pages/Statistics.js (обновленный с MUI)
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import useTechnologies from '../hooks/useTechnologies';

function Statistics() {
  const { technologies, progress } = useTechnologies();

  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const total = technologies.length;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Статистика</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1">Общий прогресс</Typography>
        <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ height: 10, borderRadius: 5, mt: 1 }} />
        <Typography variant="body2" sx={{ textAlign: 'right', mt: 0.5 }}>{progress}%</Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <Box>
          <Typography variant="subtitle1">Изучено: {completed}</Typography>
          <LinearProgress variant="determinate" value={(completed / total) * 100 || 0} color="success" sx={{ height: 8, borderRadius: 5 }} />
        </Box>
        <Box>
          <Typography variant="subtitle1">В процессе: {inProgress}</Typography>
          <LinearProgress variant="determinate" value={(inProgress / total) * 100 || 0} color="warning" sx={{ height: 8, borderRadius: 5 }} />
        </Box>
        <Box>
          <Typography variant="subtitle1">Не начато: {notStarted}</Typography>
          <LinearProgress variant="determinate" value={(notStarted / total) * 100 || 0} color="error" sx={{ height: 8, borderRadius: 5 }} />
        </Box>
      </Box>

      <Typography variant="body1" sx={{ mt: 3 }}>Всего: <strong>{total}</strong></Typography>
    </Paper>
  );
}

export default Statistics;