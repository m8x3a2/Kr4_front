// src/pages/TechnologyList.js

import '../components/TechnologyCard.css';
import '../components/ProgressHeader.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import FilterButtons from '../components/FilterButtons';
import TechnologyCard from '../components/TechnologyCard';

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
  } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = technologies
    .filter(tech => filter === 'all' || tech.status === filter)
    .filter(tech => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        tech.title.toLowerCase().includes(q) ||
        tech.description.toLowerCase().includes(q) ||
        (tech.notes && tech.notes.toLowerCase().includes(q))
      );
    });

  return (
    <div className="page">
      {/* Шапка — только заголовок */}
      <div className="page-header">
        <h1>Список технологий</h1>
      </div>

      {/* Прогресс-бар */}
      <ProgressHeader technologies={technologies} />

      {/* Быстрые действия */}
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onSelectRandomNext={selectRandomNext}
        onClearAllNotes={clearAllNotes}
        technologies={technologies}
      />

      {/* КНОПКА "ДОБАВИТЬ" — ПЕРЕНЕСЕНА СЮДА */}
      <div style={{ margin: '30px 0 20px', textAlign: 'right' }}>
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
      </div>

      {/* Фильтры */}
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

      {/* Поиск */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск по названию, описанию или заметкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechs.length} из {technologies.length}</span>
      </div>

      {/* Список карточек */}
      <div className="technologies-list">
        {filteredTechs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
            Ничего не найдено
          </p>
        ) : (
          filteredTechs.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
              onDelete={deleteTechnology}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TechnologyList;