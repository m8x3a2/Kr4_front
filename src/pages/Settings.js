// src/pages/Settings.js (обновленный с drag-and-drop для импорта по тетради)

import { useRef, useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
  const { 
    technologies,
    markAllCompleted, 
    resetAll, 
    clearAllNotes,
    setTechnologies
  } = useTechnologies();

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importError, setImportError] = useState(null);

  // ЭКСПОРТ — скачивает файл (остается как есть)
  const handleExport = () => {
    const data = {
      exportedAt: new Date().toLocaleString('ru-RU'),
      total: technologies.length,
      technologies
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Файл успешно скачан!');
  };

  // ИМПОРТ — общая функция для обработки файла
  const processImport = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.technologies || !Array.isArray(data.technologies)) {
          throw new Error('Файл не содержит данные технологий');
        }

        // Валидация каждой технологии
        data.technologies.forEach(tech => {
          if (!tech.title || tech.title.trim().length < 2) {
            throw new Error('Одна из технологий имеет некорректное название');
          }
        });

        if (!window.confirm(
          `Внимание!\n\n` +
          `Сейчас в трекере: ${technologies.length} технологий\n` +
          `В файле: ${data.technologies.length} технологий\n\n` +
          `Заменить все данные? (текущие будут удалены безвозвратно)`
        )) {
          return;
        }

        setTechnologies(data.technologies);
        alert('Данные успешно импортированы!');
      } catch (err) {
        setImportError(err.message);
      }
    };
    reader.readAsText(file);
  };

  // Drag-and-drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setImportError(null);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      processImport(file);
    } else {
      setImportError('Некорректный тип файла. Требуется JSON.');
    }
  };

  const handleFileSelect = (e) => {
    setImportError(null);
    const file = e.target.files[0];
    if (file) {
      processImport(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="page">
      <h1>Настройки</h1>

      <section style={{ marginBottom: '40px' }}>
        <h3>Управление данными</h3>
        <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
          <button onClick={markAllCompleted} className="btn" style={{ background: '#27ae60' }}>
            Отметить все как выполненные
          </button>
          <button onClick={resetAll} className="btn" style={{ background: '#e67e22' }}>
            Сбросить все статусы
          </button>
          <button onClick={clearAllNotes} className="btn" style={{ background: '#e74c3c' }}>
            Очистить все заметки
          </button>
        </div>
      </section>

      <section>
        <h3>Экспорт и импорт данных</h3>
        <p style={{ color: '#555', marginBottom: '20px' }}>
          Сохраните резервную копию или перенесите данные на другое устройство.
        </p>

        <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
          <button onClick={handleExport} className="btn" style={{ background: '#3498db' }}>
            Скачать резервную копию (JSON)
          </button>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragging ? '#3498db' : '#ddd'}`,
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              background: isDragging ? '#f8f9fa' : 'transparent',
              transition: 'all 0.3s ease'
            }}
            role="region"
            aria-label="Зона для перетаскивания файла"
          >
            <p>Перетащите JSON файл сюда или</p>
            <button onClick={triggerFileInput} className="btn" style={{ background: '#9b59b6' }}>
              Выберите файл
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {importError && (
            <p style={{ color: '#e74c3c', marginTop: '10px' }} role="alert">
              {importError}
            </p>
          )}
        </div>

        <small style={{ display: 'block', marginTop: '15px', color: '#7f8c8d' }}>
          Файл сохраняется как: <code>technologies-backup-2025-12-03.json</code>
        </small>
      </section>
    </div>
  );
}

export default Settings;