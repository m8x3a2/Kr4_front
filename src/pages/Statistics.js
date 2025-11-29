// src/pages/Statistics.js — упрощённая и правильная версия по тетради
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';

function Statistics() {
  const { technologies, progress } = useTechnologies();

  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  return (
    <div className="page">
      <h1>Статистика прогресса</h1>

      <ProgressBar progress={progress} label="Общий прогресс изучения" />

      <div style={{ marginTop: '30px' }}>
        <h3>Подробно:</h3>
        <ul style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
          <li>Всего технологий: <strong>{technologies.length}</strong></li>
          <li>Изучено: <strong>{completed}</strong></li>
          <li>В процессе: <strong>{inProgress}</strong></li>
          <li>Не начато: <strong>{notStarted}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default Statistics;