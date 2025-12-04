// src/pages/TechnologyDetail.js (обновленный с MUI)
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  ButtonGroup,
  Button,
  Paper,
  Alert,
  Snackbar,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { id } = useParams();
  const techId = parseInt(id);
  const navigate = useNavigate();
  const { technologies, updateStatus, updateDeadline } = useTechnologies();

  const technology = technologies.find(t => t.id === techId);

  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [errorResources, setErrorResources] = useState(null);

  const [deadlineForm, setDeadlineForm] = useState(technology?.deadline || '');
  const [deadlineError, setDeadlineError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const shouldLoadResources = techId >= 1 && techId <= 10;
    if (!shouldLoadResources) return;

    const fetchResources = async () => {
      setLoadingResources(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${techId}`);
        if (!response.ok) throw new Error('Ошибка');
        const data = await response.json();
        setResources(data.map(post => ({ title: post.title, body: post.body })));
      } catch (err) {
        setErrorResources(err.message);
      } finally {
        setLoadingResources(false);
      }
    };
    fetchResources();
  }, [techId]);

  if (!technology) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div />
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/technologies')}>
            Назад
          </Button>
        </Box>
        <Typography variant="h5">Не найдено</Typography>
      </Paper>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateStatus(techId, newStatus);
    setSnackbarOpen(true);
  };

  const validateDeadline = (date) => {
    if (!date) return null;
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);
    return selected < today ? 'Дата в прошлом' : null;
  };

  const handleDeadlineChange = (e) => {
    const value = e.target.value;
    setDeadlineForm(value);
    setDeadlineError(validateDeadline(value));
  };

  const handleDeadlineSubmit = (e) => {
    e.preventDefault();
    if (!deadlineError && deadlineForm) {
      updateDeadline(techId, deadlineForm);
      setSnackbarOpen(true);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">{technology.title}</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/technologies')}>
          Назад
        </Button>
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {technology.description || 'Описание отсутствует'}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>Статус</Typography>
      <ButtonGroup variant="outlined">
        {['not-started', 'in-progress', 'completed'].map(s => (
          <Button
            key={s}
            color={technology.status === s ? 'primary' : 'inherit'}
            onClick={() => handleStatusChange(s)}
          >
            {s === 'not-started' ? 'Не начато' : s === 'in-progress' ? 'В процессе' : 'Изучено'}
          </Button>
        ))}
      </ButtonGroup>

      {technology.notes && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Заметки</Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
            {technology.notes}
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Срок изучения</Typography>
        <form onSubmit={handleDeadlineSubmit}>
          <TextField
            type="date"
            value={deadlineForm}
            onChange={handleDeadlineChange}
            error={!!deadlineError}
            helperText={deadlineError}
            size="small"
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained" disabled={!!deadlineError || !deadlineForm}>
            Сохранить
          </Button>
        </form>
        {technology.deadline && (
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Текущий: {technology.deadline}
          </Typography>
        )}
      </Box>

      {techId >= 1 && techId <= 10 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Ресурсы</Typography>
          {loadingResources ? <Typography>Загрузка...</Typography> :
            errorResources ? <Alert severity="error">{errorResources}</Alert> :
            resources.length > 0 ? (
              <Box component="ul" sx={{ pl: 2 }}>
                {resources.map((res, i) => (
                  <li key={i}>
                    <strong>{res.title}</strong>: {res.body.substring(0, 100)}...
                  </li>
                ))}
              </Box>
            ) : <Typography>Не найдены</Typography>
          }
        </Box>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success">Изменения сохранены!</Alert>
      </Snackbar>
    </Paper>
  );
}

export default TechnologyDetail;