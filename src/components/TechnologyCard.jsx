// src/components/TechnologyCard.jsx

import { Link } from 'react-router-dom';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onDelete }) {
  const { id, title, description, status, notes } = technology;

  const nextStatus = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  // Клик по карточке (но НЕ по названию и НЕ по кнопке удалить) → меняет статус
  const handleCardClick = (e) => {
    // Если кликнули по ссылке с названием — не меняем статус
    if (e.target.closest('a') || e.target.closest('h3') || e.target.closest('button')) {
      return;
    }
    onStatusChange(id, nextStatus[status]);
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить технологию "${title}"?`)) {
      onDelete(id);
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Не начато';
    }
  };

  return (
    <div
      className={`technology-card status-${status}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="technology-header">
        {/* Название — ссылка на детальную страницу */}
        <Link
          to={`/technologies/${id}`}
          style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
          onClick={(e) => e.stopPropagation()} // отменяем смену статуса при клике по названию
        >
          <h3 style={{ margin: 0, fontSize: '1.3em' }}>{title}</h3>
        </Link>

        {/* Статус — справа */}
        <span className="status-badge">
          {getStatusText()}
        </span>
      </div>

      <p className="technology-description">
        {description || 'Без описания'}
      </p>

      {/* Подсказка */}
      <div style={{
        margin: '12px 0',
        fontSize: '0.9em',
        color: '#27ae60',
        fontWeight: '500'
      }}>
        Клик по карточке → сменить статус • Клик по названию → открыть детали
      </div>

      {/* Заметки */}
      <div onClick={(e) => e.stopPropagation()}>
        <TechnologyNotes
          notes={notes || ''}
          onNotesChange={onNotesChange}
          techId={id}
        />
      </div>

      {/* Кнопка Удалить */}
      <div onClick={(e) => e.stopPropagation()} style={{ marginTop: '15px', textAlign: 'right' }}>
        <button
          onClick={handleDelete}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default TechnologyCard;