// src/pages/Statistics.js (Самостоятельная работа, Задание 1)
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';

function Statistics() {
  const { technologies, progress } = useTechnologies();

  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  // Дополнительно: прогресс по категориям (график в виде нескольких прогресс-баров)
  const frontendTechs = technologies.filter(t => t.category === 'frontend');
  const backendTechs = technologies.filter(t => t.category === 'backend');

  const frontendProgress = frontendTechs.length > 0 ? Math.round((frontendTechs.filter(t => t.status === 'completed').length / frontendTechs.length) * 100) : 0;
  const backendProgress = backendTechs.length > 0 ? Math.round((backendTechs.filter(t => t.status === 'completed').length / backendTechs.length) * 100) : 0;

  return (
    <div className="page">
      <h1>Статистика</h1>
      
      <ProgressBar progress={progress} label="Общий прогресс" color="#4CAF50" />
      
      <h3>По категориям:</h3>
      <ProgressBar progress={frontendProgress} label="Frontend" color="#2196F3" />
      <ProgressBar progress={backendProgress} label="Backend" color="#FF9800" />
      
      <h3>Детали:</h3>
      <ul>
        <li>Всего технологий: {technologies.length}</li>
        <li>Завершено: {completed}</li>
        <li>В процессе: {inProgress}</li>
        <li>Не начато: {notStarted}</li>
      </ul>
    </div>
  );
}

export default Statistics;