// src/pages/AddTechnology.js (обновленный с MUI)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { addTechnology } = useTechnologies();
  const navigate = useNavigate();

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Название обязательно';
    else if (data.title.length < 2) newErrors.title = 'Минимум 2 символа';
    else if (data.title.length > 50) newErrors.title = 'Максимум 50 символов';
    if (data.description.length > 500) newErrors.description = 'Максимум 500 символов';
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    validateForm(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      addTechnology({
        ...formData,
        status: 'not-started',
        notes: ''
      });
      setSnackbarOpen(true);
      navigate('/technologies');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Добавить технологию</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/technologies')}>
          Назад
        </Button>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Название"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary" 
            disabled={!isFormValid}
          >
            Добавить
          </Button>
          <Button variant="outlined" onClick={() => navigate('/technologies')}>
            Отмена
          </Button>
        </Box>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success">Технология добавлена!</Alert>
      </Snackbar>
    </Paper>
  );
}

export default AddTechnology;