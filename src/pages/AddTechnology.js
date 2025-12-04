// src/pages/AddTechnology.js (обновленный с валидацией, ошибками и доступностью)

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const { addTechnology } = useTechnologies();
  const navigate = useNavigate();

  // Состояние формы
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // Состояние ошибок
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Валидация формы
  const validateForm = (data) => {
    const newErrors = {};

    // Валидация названия
    if (!data.title.trim()) {
      newErrors.title = 'Название технологии обязательно';
    } else if (data.title.trim().length < 2) {
      newErrors.title = 'Название должно быть не менее 2 символов';
    } else if (data.title.trim().length > 50) {
      newErrors.title = 'Название не должно превышать 50 символов';
    }

    // Валидация описания (опционально)
    if (data.description.trim() && data.description.trim().length > 500) {
      newErrors.description = 'Описание не должно превышать 500 символов';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Обработчик изменений
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    validateForm(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(formData);

    if (isFormValid) {
      addTechnology({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: 'not-started',
        notes: ''
      });
      navigate('/technologies');
    }
  };

  return (
    <div className="page">
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

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }} noValidate>
        <div style={{ marginBottom: '24px' }}>
          <label 
            htmlFor="title"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              color: '#2c3e50'
            }}
          >
            Название технологии
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: TypeScript, Docker, GraphQL..."
            required
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.1em',
              borderRadius: '8px',
              border: errors.title ? '1px solid #e74c3c' : '1px solid #ddd',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}
          />
          {errors.title && (
            <p id="title-error" style={{ color: '#e74c3c', marginTop: '8px', fontSize: '0.9em' }} role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label 
            htmlFor="description"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              color: '#2c3e50'
            }}
          >
            Описание (необязательно)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Зачем учить эту технологию? Краткое описание..."
            rows="4"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.05em',
              borderRadius: '8px',
              border: errors.description ? '1px solid #e74c3c' : '1px solid #ddd',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          {errors.description && (
            <p id="description-error" style={{ color: '#e74c3c', marginTop: '8px', fontSize: '0.9em' }} role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={!isFormValid}
            className="btn"
            style={{
              background: isFormValid ? '#27ae60' : '#95a5a6',
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