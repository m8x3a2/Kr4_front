// src/pages/TechnologyDetail.js
// Обновлено в соответствии с README: кнопки для статуса, заметки как p (просмотр), редактирование заметок остается в карточке списка
import { useParams, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { id } = useParams();
  const { technologies, updateStatus } = useTechnologies();

  const technology = technologies.find(t => t.id === parseInt(id));

  const updateStatusHandler = (newStatus) => {
    updateStatus(technology.id, newStatus);
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <Link to="/technologies">← Назад к списку</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">← Назад</Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="detail-section">
        <h3>Описание</h3>
        <p>{technology.description}</p>
      </div>

      <div className="detail-section">
        <h3>Статус</h3>
        <div className="status-buttons">
          <button
            onClick={() => updateStatusHandler('not-started')}
            className={technology.status === 'not-started' ? 'active' : ''}
          >
            Не начато
          </button>
          <button
            onClick={() => updateStatusHandler('in-progress')}
            className={technology.status === 'in-progress' ? 'active' : ''}
          >
            В процессе
          </button>
          <button
            onClick={() => updateStatusHandler('completed')}
            className={technology.status === 'completed' ? 'active' : ''}
          >
            Изучено
          </button>
        </div>
      </div>

      {technology.notes && (
        <div className="detail-section">
          <h3>Заметки</h3>
          <p>{technology.notes}</p>
        </div>
      )}
    </div>
  );
}

export default TechnologyDetail;