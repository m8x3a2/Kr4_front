// src/pages/AddTechnology.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTechnology } = useTechnologies();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTechnology({
      title: title.trim(),
      description: description.trim(),
      status: 'not-started',
      notes: ''
    });

    navigate('/technologies');
  };

  return (
    <div className="page">
      {/* Заголовок слева, кнопка "Назад" справа */}
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2em', color: '#2c3e50' }}>
            Добавить технологию
          </h1>
        </div>
        <Link to="/technologies" className="back-link">
          Назад
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            Название технологии
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: TypeScript, Docker, GraphQL..."
            required
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.1em',
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            Описание (необязательно)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Зачем учить эту технологию? Краткое описание..."
            rows="4"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.05em',
              borderRadius: '8px',
              border: '1px solid #ddd',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            className="btn"
            style={{
              background: '#27ae60',
              padding: '12px 24px',
              fontSize: '1.05em',
              fontWeight: '600'
            }}
          >
            Добавить технологию
          </button>

          <Link
            to="/technologies"
            style={{
              padding: '12px 24px',
              background: '#95a5a6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '1.05em',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;