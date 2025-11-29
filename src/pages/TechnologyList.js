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
      <div className="page-header">
        <h1>Список технологий</h1>
        <Link to="/add" className="btn">+ Добавить</Link>
      </div>

      <ProgressHeader technologies={technologies} />

      <QuickActions 
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onSelectRandomNext={selectRandomNext}
        onClearAllNotes={clearAllNotes}
        technologies={technologies}
      />

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
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TechnologyList;