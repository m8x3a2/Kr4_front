// src/pages/Statistics.js
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';

function Statistics() {
  const { technologies, progress } = useTechnologies();

  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  const total = technologies.length;

  return (
    <div className="page">
      <h1>Статистика прогресса</h1>

      <ProgressBar progress={progress} label="Общий прогресс" color="#4caf50" />

      <div style={{ marginTop: '40px' }}>
        <h2>По статусам</h2>

        <ProgressBar
          progress={total ? Math.round((completed / total) * 100) : 0}
          label={`Изучено: ${completed}`}
          color="#27ae60"
        />

        <ProgressBar
          progress={total ? Math.round((inProgress / total) * 100) : 0}
          label={`В процессе: ${inProgress}`}
          color="#f39c12"
        />

        <ProgressBar
          progress={total ? Math.round((notStarted / total) * 100) : 0}
          label={`Не начато: ${notStarted}`}
          color="#e74c3c"
        />
      </div>

      <div style={{ marginTop: '40px', fontSize: '1.1em', lineHeight: '1.8' }}>
        <p>Всего технологий в трекере: <strong>{total}</strong></p>
      </div>
    </div>
  );
}

export default Statistics;