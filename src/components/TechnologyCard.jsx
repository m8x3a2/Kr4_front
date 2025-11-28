import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes } = technology;

  const nextStatus = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();                    // важно!
    onStatusChange(id, nextStatus[status]);
  };

  return (
   // TechnologyCard.jsx — заменить весь внешний div на этот код:
<div 
  className={`technology-card status-${status}`}
  onClick={handleStatusClick}               // ← добавляем сюда клик
>
  <div className="technology-header">
    <h3>{title}</h3>
    <span className="status-badge">
      {status === 'completed' && 'Изучено'}
      {status === 'in-progress' && 'В процессе'}
      {status === 'not-started' && 'Не начато'}
    </span>
  </div>

  <p className="technology-description">{description}</p>
  
  <small style={{color: '#666', display: 'block', margin: '8px 0'}}>
    Клик по карточке — сменить статус
  </small>

  {/* Останавливаем всплытие, чтобы редактирование заметок не меняло статус */}
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