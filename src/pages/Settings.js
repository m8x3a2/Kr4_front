// src/pages/Settings.js
import { useRef } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
  const { 
    technologies,
    markAllCompleted, 
    resetAll, 
    clearAllNotes,
    setTechnologies // ← это важно! позволяет полностью заменить данные
  } = useTechnologies();

  const fileInputRef = useRef(null);

  // ЭКСПОРТ — скачивает файл
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

  // ИМПОРТ — читает выбранный файл
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.technologies || !Array.isArray(data.technologies)) {
          alert('Ошибка: файл не содержит данные технологий');
          return;
        }

        // Подтверждение перед заменой
        if (!window.confirm(
          `Внимание!\n\n` +
          `Сейчас в трекере: ${technologies.length} технологий\n` +
          `В файле: ${data.technologies.length} технологий\n\n` +
          `Заменить все данные? (текущие будут удалены безвозвратно)`
        )) {
          return;
        }

        setTechnologies(data.technologies);
        alert(`Успешно импортировано ${data.technologies.length} технологий!`);
      } catch (err) {
        alert('Ошибка чтения файла. Убедитесь, что это правильный JSON от трекера.');
        console.error(err);
      }
    };

    reader.readAsText(file);
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

          <button onClick={triggerFileInput} className="btn" style={{ background: '#9b59b6' }}>
            Загрузить из файла
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>

        <small style={{ display: 'block', marginTop: '15px', color: '#7f8c8d' }}>
          Файл сохраняется как: <code>technologies-backup-2025-12-03.json</code>
        </small>
      </section>
    </div>
  );
}

export default Settings;