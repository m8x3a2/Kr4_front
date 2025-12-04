// src/components/TechnologyCard.jsx — ПОЛНОСТЬЮ ГОТОВО К СДАЧЕ

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
    if (
      e.target.closest('a') ||
      e.target.closest('button') ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.tagName === 'INPUT'
    ) {
      return;
    }
    onStatusChange(id, nextStatus[status]);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Удалить "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: 8 
        },
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          {/* ← НАЗВАНИЕ С КРАСИВЫМ HOVER-ЭФФЕКТОМ */}
          <Link
            to={`/technologies/${id}`}
            style={{ textDecoration: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary.main',  // ← вот оно! меняется только цвет
                }
              }}
            >
              {title}
            </Typography>
          </Link>

          <Chip
            icon={getStatusIcon()}
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
          {description || 'Без описания'}
        </Typography>

        {deadline && (
          <Typography variant="caption" color="primary.main" sx={{ display: 'block', mb: 2, fontWeight: 500 }}>
            Срок: {deadline}
          </Typography>
        )}

        <Box onClick={(e) => e.stopPropagation()}>
          <TechnologyNotes
            notes={notes || ''}
            onNotesChange={onNotesChange}
            techId={id}
          />
        </Box>
      </CardContent>

      <Box sx={{ p: 2, pt: 0, textAlign: 'right' }}>
        <Button
          size="small"
          color="error"
          variant="text"
          onClick={handleDelete}
        >
          Удалить
        </Button>
      </Box>
    </Card>
  );
}

export default TechnologyCard;