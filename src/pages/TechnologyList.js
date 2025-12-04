// src/pages/TechnologyList.jsx — ФИНАЛЬНАЯ ВЕРСИЯ С ПОДДЕРЖКОЙ ТЁМНОЙ ТЕМЫ

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import useTechnologies from '../hooks/useTechnologies';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import FilterButtons from '../components/FilterButtons';
import TechnologyCard from '../components/TechnologyCard';
import BulkEdit from '../components/BulkEdit';

function TechnologyList() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    selectRandomNext,
    clearAllNotes,
    deleteTechnology,
    setTechnologies
  } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  const filteredTechs = technologies
    .filter(tech => filter === 'all' || tech.status === filter)
    .filter(tech => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        tech.title.toLowerCase().includes(q) ||
        (tech.description && tech.description.toLowerCase().includes(q)) ||
        (tech.notes && tech.notes.toLowerCase().includes(q))
      );
    });

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBulkUpdate = (ids, newStatus) => {
    setTechnologies(prev =>
      prev.map(t => ids.includes(t.id) ? { ...t, status: newStatus } : t)
    );
    setSelectedIds([]);
    setShowBulkEdit(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        py: 4
      }}
    >
      <Container maxWidth="lg">

        {/* Заголовок */}
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Список технологий
        </Typography>

        <ProgressHeader technologies={technologies} />
        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          onSelectRandomNext={selectRandomNext}
          onClearAllNotes={clearAllNotes}
          technologies={technologies}
        />

        {/* Кнопки "Добавить" + "Редактировать выбранные" */}
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            {selectedIds.length > 0 && (
              <Typography variant="h6" color="primary">
                Выбрано: {selectedIds.length}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/add"
              variant="contained"
              color="success"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 600 }}
            >
              + Добавить технологию
            </Button>

            {selectedIds.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setShowBulkEdit(true)}
                sx={{ px: 4, py: 1.5 }}
              >
                Редактировать выбранные ({selectedIds.length})
              </Button>
            )}
          </Box>
        </Box>

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        {/* Поиск */}
        <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <input
            type="text"
            placeholder="Поиск по названию, описанию или заметкам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '8px',
              outline: 'none',
              background: 'transparent'
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Найдено: {filteredTechs.length} из {technologies.length}
          </Typography>
        </Box>

        {/* Список технологий */}
        <Box sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
        }}>
          {filteredTechs.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ gridColumn: '1 / -1', py: 8 }}>
              Ничего не найдено
            </Typography>
          ) : (
            filteredTechs.map(tech => (
              <Box key={tech.id} sx={{ position: 'relative', paddingTop: '48px' }}>
                {/* Чекбокс */}
                <input
                  type="checkbox"
                  checked={selectedIds.includes(tech.id)}
                  onChange={() => toggleSelect(tech.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 10,
                    width: '28px',
                    height: '28px',
                    accentColor: '#3498db',
                    cursor: 'pointer',
                    transform: 'scale(1.2)',
                    filter: 'drop-shadow(0 2px 6px rgba(52,152,219,0.3))'
                  }}
                  aria-label={`Выбрать ${tech.title}`}
                />

                {/* Карточка */}
                <Box sx={{ pt: 1 }}>
                  <TechnologyCard
                    technology={tech}
                    onStatusChange={updateStatus}
                    onNotesChange={updateNotes}
                    onDelete={deleteTechnology}
                  />
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Модальное окно массового редактирования */}
        {showBulkEdit && (
          <Box
            sx={{
              position: 'fixed',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300
            }}
            onClick={() => setShowBulkEdit(false)}
          >
            <Box onClick={e => e.stopPropagation()}>
              <BulkEdit
                selectedIds={selectedIds}
                onBulkUpdate={handleBulkUpdate}
                onClose={() => setShowBulkEdit(false)}
              />
            </Box>
          </Box>
        )}

      </Container>
    </Box>
  );
}

export default TechnologyList;