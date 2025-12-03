// src/pages/TechnologyDetail.js

import { useParams, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { id } = useParams();
  const { technologies, updateStatus } = useTechnologies();

  const technology = technologies.find(t => t.id === parseInt(id));

  if (!technology) {
    return (
      <div className="page">
        <div className="page-header">
          <div></div>
          <Link to="/technologies" className="back-link">Назад</Link>
        </div>
        <h1>Технология не найдена</h1>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateStatus(id, newStatus);
  };

  return (
    <div className="page">
      {/* Шапка: название слева, назад — справа */}
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2em', color: '#2c3e50' }}>
            {technology.title}
          </h1>
        </div>
        <Link to="/technologies" className="back-link">
          Назад
        </Link>
      </div>

      {/* Описание под названием */}
      {technology.description ? (
        <div style={{ marginBottom: '30px', lineHeight: '1.6', color: '#444', fontSize: '1.1em' }}>
          {technology.description}
        </div>
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>Описание отсутствует</p>
      )}

      {/* Статус */}
      <div style={{ margin: '30px 0' }}>
        <h3>Статус изучения</h3>
        <div className="status-buttons">
          {['not-started', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={technology.status === status ? 'active' : ''}
            >
              {status === 'not-started' && 'Не начато'}
              {status === 'in-progress' && 'В процессе'}
              {status === 'completed' && 'Изучено'}
            </button>
          ))}
        </div>
      </div>

      {/* Заметки */}
      {technology.notes && (
        <div style={{ marginTop: '30px' }}>
          <h3>Заметки</h3>
          <p style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #3498db',
            whiteSpace: 'pre-wrap',
            fontSize: '1em',
            lineHeight: '1.6'
          }}>
            {technology.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default TechnologyDetail;