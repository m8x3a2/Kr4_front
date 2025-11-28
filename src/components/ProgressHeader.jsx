function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>Прогресс изучения технологий</h2>
      
      <div className="stats">
        <p>Всего: <strong>{total}</strong></p>
        <p>Изучено: <strong>{completed}</strong></p>
        <p>Готовность: <strong>{percentage}%</strong></p>
      </div>

      {/* Этот блок теперь совпадает с твоими стилями */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressHeader;