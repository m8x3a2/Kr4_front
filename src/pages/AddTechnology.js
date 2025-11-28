import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { technologies, addTechnology } = useTechnologies();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTechnology({
      id: Math.max(...technologies.map(t => t.id), 0) + 1,
      title,
      description,
      status: 'not-started',
      notes: ''
    });

    navigate('/technologies');
  };

  return (
    <div className="page">
      <h1>Добавить технологию</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название технологии"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Добавить</button>
          <button type="button" onClick={() => navigate('/technologies')} style={{ marginLeft: '10px' }}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;