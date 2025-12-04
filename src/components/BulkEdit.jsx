// src/components/BulkEdit.jsx (новый: для массового редактирования статусов - Задание 2)
// Добавьте этот файл в src/components, затем импортируйте в TechnologyList.js

import { useState } from 'react';

function BulkEdit({ selectedIds, onBulkUpdate, onClose }) {
  const [newStatus, setNewStatus] = useState('not-started');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      setError('Выберите хотя бы одну технологию');
      return;
    }
    onBulkUpdate(selectedIds, newStatus);
    onClose();
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h3>Массовое редактирование</h3>
      <p>Выбрано: {selectedIds.length} технологий</p>
      
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="status"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600'
            }}
          >
            Новый статус
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Изучено</option>
          </select>
        </div>

        {error && (
          <p style={{ color: '#e74c3c', marginBottom: '10px' }} role="alert">
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit"
            style={{
              background: '#27ae60',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              flex: 1
            }}
          >
            Применить
          </button>
          <button 
            type="button"
            onClick={onClose}
            style={{
              background: '#95a5a6',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              flex: 1
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default BulkEdit;