import '../components/Modal.css';
import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  onSelectRandomNext,  // ← добавил (был onRandomNext, но сделал consistent)
  onClearAllNotes,     // ← добавил
  technologies 
}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      technologies
    };
    console.log('Экспортированные данные:', JSON.stringify(data, null, 2));
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={onMarkAllCompleted} style={{ background: '#27ae60', color: 'white' }}>
          Отметить все как выполненные
        </button>
        <button onClick={onResetAll} style={{ background: '#e67e22', color: 'white' }}>
          Сбросить все статусы
        </button>
        <button onClick={handleExport} style={{ background: '#3498db', color: 'white' }}>
          Экспорт данных
        </button>
        <button onClick={onSelectRandomNext} style={{ background: '#9b59b6', color: 'white' }}>
          Выбрать случайную следующую
        </button>
        <button onClick={onClearAllNotes} style={{ background: '#e74c3c', color: 'white' }}>
          Очистить все заметки
        </button>
      </div>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт завершён">
        <p>Данные успешно экспортированы!</p>
        <p>Откройте консоль разработчика (F12 → Console), чтобы увидеть JSON.</p>
      </Modal>
    </div>
  );
}

export default QuickActions;