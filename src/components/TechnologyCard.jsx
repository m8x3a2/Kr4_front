// src/components/TechnologyCard.jsx
import { Link } from 'react-router-dom';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes } = technology;

  const nextStatus = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  // ЭТА ФУНКЦИЯ ТЕПЕРЬ ИСПОЛЬЗУЕТСЯ!
  const handleStatusClick = (e) => {
    e.preventDefault();        // ← Важно! Блокируем переход по Link
    e.stopPropagation();
    onStatusChange(id, nextStatus[status]);
  };

  return (
    <div className={`technology-card status-${status}`}>
      {/* Оборачиваем ВЕСЬ контент в Link, НО отменяем переход при клике на статус */}
      <Link 
        to={`/technologies/${id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={(e) => {
          // Если клик был именно по заголовку — меняем статус и блокируем переход
          if (e.target.closest('.technology-header')) {
            handleStatusClick(e);
          }
        }}
      >
        <div className="technology-header" onClick={handleStatusClick}>
          <h3>{title}</h3>
          <span className="status-badge">
            {status === 'completed' && 'Изучено'}
            {status === 'in-progress' && 'В процессе'}
            {status === 'not-started' && 'Не начато'}
          </span>
        </div>

        <p className="technology-description">{description}</p>

        <div style={{ margin: '12px 0', fontSize: '0.9em', color: '#27ae60', fontWeight: '500' }}>
          Клик по заголовку → сменить статус
        </div>
      </Link>

      {/* Заметки — вне Link, чтобы не мешать */}
      <div onClick={(e) => e.stopPropagation()}>
        <TechnologyNotes 
          notes={notes || ''} 
          onNotesChange={onNotesChange}
          techId={id}
        />
      </div>
    </div>
  );
}

export default TechnologyCard;