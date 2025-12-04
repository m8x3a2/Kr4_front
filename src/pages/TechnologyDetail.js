// src/pages/TechnologyDetail.js

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { id } = useParams();
  const { technologies, updateStatus } = useTechnologies();
  const techId = parseInt(id);

  const technology = technologies.find(t => t.id === techId);

  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [errorResources, setErrorResources] = useState(null);

  // ←←← ВОТ ГЛАВНОЕ ИЗМЕНЕНИЕ: загружаем ресурсы ТОЛЬКО для id от 1 до 10
  useEffect(() => {
    const shouldLoadResources = techId >= 1 && techId <= 10;

    if (!shouldLoadResources) {
      setResources([]);
      return;
    }

    const fetchResources = async () => {
      try {
        setLoadingResources(true);
        setErrorResources(null);

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${techId}`);
        if (!response.ok) throw new Error('Ошибка загрузки');

        const data = await response.json();
        setResources(data.map(post => ({
          title: post.title,
          body: post.body
        })));
      } catch (err) {
        setErrorResources(err.message);
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, [techId]);

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
    updateStatus(techId, newStatus);
  };

  return (
    <div className="page">
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

      {technology.description ? (
        <div style={{ marginBottom: '30px', lineHeight: '1.6', color: '#444', fontSize: '1.1em' }}>
          {technology.description}
        </div>
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>Описание отсутствует</p>
      )}

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

      {/* ←←← Блок с ресурсами теперь показывается ТОЛЬКО для демо-карточек */}
      {techId >= 1 && techId <= 10 && (
        <div style={{ marginTop: '40px' }}>
          <h3>Дополнительные ресурсы</h3>
          {loadingResources ? (
            <p>Загрузка ресурсов...</p>
          ) : errorResources ? (
            <p style={{ color: '#e74c3c' }}>{errorResources}</p>
          ) : resources.length > 0 ? (
            <ul style={{ paddingLeft: '20px' }}>
              {resources.map((res, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <strong>{res.title}</strong>: {res.body.substring(0, 120)}...
                </li>
              ))}
            </ul>
          ) : (
            <p>Ресурсы не найдены</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologyDetail;