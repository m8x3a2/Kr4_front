// src/components/TechnologyCard.jsx (обновленный с MUI)
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onDelete }) {
  const { id, title, description, status, notes, deadline } = technology;

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <CheckCircleIcon />;
      case 'in-progress': return <HourglassEmptyIcon />;
      default: return <PlayCircleOutlineIcon />;
    }
  };

  const nextStatus = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) {
      return;
    }
    onStatusChange(id, nextStatus[status]);
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
        position: 'relative'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Link to={`/technologies/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">{title}</Typography>
          </Link>
          <Chip 
            icon={getStatusIcon()}
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description || 'Без описания'}
        </Typography>

        {deadline && (
          <Typography variant="caption" color="primary" sx={{ display: 'block', mb: 1 }}>
            Срок: {deadline}
          </Typography>
        )}

        <TechnologyNotes
          notes={notes || ''}
          onNotesChange={onNotesChange}
          techId={id}
        />
      </CardContent>

      <Box sx={{ p: 1, textAlign: 'right' }}>
        <Button color="error" size="small" onClick={handleDelete}>
          Удалить
        </Button>
      </Box>
    </Card>
  );
}

export default TechnologyCard;