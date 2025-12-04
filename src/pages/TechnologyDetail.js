// src/pages/TechnologyDetail.js (обновленный: добавляем форму для deadline - Задание 1)

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { id } = useParams();
  const techId = parseInt(id);
  const { technologies, updateStatus, updateDeadline } = useTechnologies();

  const technology = technologies.find(t => t.id === techId);

  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [errorResources, setErrorResources] = useState(null);

  // Форма для deadline
  const [deadlineForm, setDeadlineForm] = useState(technology?.deadline || '');
  const [deadlineError, setDeadlineError] = useState(null);

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

  const validateDeadline = (date) => {
    if (!date) return null;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return 'Срок не может быть в прошлом';
    }
    return null;
  };

  const handleDeadlineChange = (e) => {
    const value = e.target.value;
    setDeadlineForm(value);
    setDeadlineError(validateDeadline(value));
  };

  const handleDeadlineSubmit = (e) => {
    e.preventDefault();
    const error = validateDeadline(deadlineForm);
    if (error) {
      setDeadlineError(error);
      return;
    }
    updateDeadline(techId, deadlineForm);
    alert('Срок обновлен!');
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

      {/* Форма для установки срока (Задание 1) */}
      <div style={{ marginTop: '40px' }}>
        <h3>Установить срок изучения</h3>
        <form onSubmit={handleDeadlineSubmit} noValidate>
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="deadline"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600'
              }}
            >
              Выберите дату
            </label>
            <input
              id="deadline"
              type="date"
              value={deadlineForm}
              onChange={handleDeadlineChange}
              min={new Date().toISOString().split('T')[0]}
              aria-invalid={!!deadlineError}
              aria-describedby={deadlineError ? 'deadline-error' : undefined}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: deadlineError ? '1px solid #e74c3c' : '1px solid #ddd',
                width: '200px'
              }}
            />
            {deadlineError && (
              <p id="deadline-error" style={{ color: '#e74c3c', marginTop: '8px' }} role="alert">
                {deadlineError}
              </p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={!!deadlineError || !deadlineForm}
            style={{
              background: (!!deadlineError || !deadlineForm) ? '#95a5a6' : '#27ae60',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Сохранить срок
          </button>
        </form>
        {technology.deadline && (
          <p style={{ marginTop: '15px', color: '#555' }}>
            Текущий срок: {technology.deadline}
          </p>
        )}
      </div>

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