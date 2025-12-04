// src/pages/TechnologyList.js — ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ (исправлено положение чекбокса)

import '../components/TechnologyCard.css';
import '../components/ProgressHeader.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="page">
      <div className="page-header">
        <h1>Список технологий</h1>
      </div>

      <ProgressHeader technologies={technologies} />

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onSelectRandomNext={selectRandomNext}
        onClearAllNotes={clearAllNotes}
        technologies={technologies}
      />

      <div style={{ 
        margin: '30px 0 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '15px' 
      }}>
        <div>
          {selectedIds.length > 0 && (
            <span style={{ color: '#3498db', fontWeight: '600', fontSize: '1.1em' }}>
              Выбрано: {selectedIds.length}
            </span>
          )}
        </div>

        <div>
          <Link
            to="/add"
            className="btn"
            style={{
              fontSize: '1.1em',
              padding: '14px 28px',
              background: '#27ae60',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#219653'}
            onMouseOut={(e) => e.currentTarget.style.background = '#27ae60'}
          >
            + Добавить технологию
          </Link>

          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowBulkEdit(true)}
              style={{
                marginLeft: '15px',
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '6px',
                fontSize: '1.1em',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Редактировать выбранные ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск по названию, описанию или заметкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechs.length} из {technologies.length}</span>
      </div>

      <div className="technologies-list">
        {filteredTechs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
            Ничего не найдено
          </p>
        ) : (
          filteredTechs.map(tech => (
            <div 
              key={tech.id} 
              style={{ 
                position: 'relative',
                // Добавляем отступ сверху для чекбокса
                paddingTop: '40px' // Увеличено с 8px до 40px
              }}
            >
              {/* Чекбокс — позиционируем над карточкой */}
              <input
                type="checkbox"
                checked={selectedIds.includes(tech.id)}
                onChange={() => toggleSelect(tech.id)}
                style={{
                  position: 'absolute',
                  top: '15px', // Двигаем ближе к верху контейнера
                  left: '15px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  accentColor: '#3498db',
                  cursor: 'pointer',
                  // Добавляем тень для лучшей видимости
                  boxShadow: '0 2px 6px rgba(52, 152, 219, 0.3)'
                }}
                aria-label={`Выбрать ${tech.title}`}
                title={`Выбрать ${tech.title}`}
              />

              {/* Карточка — теперь она сдвинута вниз */}
              <div style={{ 
                // Карточка начинается ниже чекбокса
                marginTop: '0',
                // Увеличиваем padding-top для содержимого карточки
                paddingTop: '8px'
              }}>
                <TechnologyCard
                  technology={tech}
                  onStatusChange={updateStatus}
                  onNotesChange={updateNotes}
                  onDelete={deleteTechnology}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Модалка */}
      {showBulkEdit && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowBulkEdit(false)}
        >
          <div onClick={e => e.stopPropagation()}>
            <BulkEdit
              selectedIds={selectedIds}
              onBulkUpdate={handleBulkUpdate}
              onClose={() => setShowBulkEdit(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;