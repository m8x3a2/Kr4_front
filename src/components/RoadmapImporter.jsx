// src/components/RoadmapImporter.jsx
import { useState } from 'react';

function RoadmapImporter() {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);

  const handleExampleImport = async () => {
    try {
      setImporting(true);
      setError(null);
      
      // Запрос к API для импорта "дорожной карты"
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      
      if (!response.ok) {
        throw new Error(`Ошибка импорта: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Маппинг на структуру технологий (для примера)
      const importedTechs = data.map(post => ({
        id: Date.now() + post.id,
        title: post.title,
        description: post.body,
        status: 'not-started',
        notes: ''
      }));
      
      // Здесь можно добавить логику добавления в состояние или localStorage
      console.log('Импортированные технологии:', importedTechs);
      alert(`Успешно импортировано ${importedTechs.length} технологий!`);

    } catch (err) {
      setError(err.message);
      console.error('Ошибка импорта:', err);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      
      <div className="import-actions">
        <button 
          onClick={handleExampleImport}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;