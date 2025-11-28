import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Базовые компоненты React', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'JSX и пропсы', description: 'Синтаксис и передача данных', status: 'not-started', notes: '', category: 'frontend' },
  { id: 3, title: 'useState & useEffect', description: 'Управление состоянием', status: 'not-started', notes: '', category: 'frontend' },
  { id: 4, title: 'Node.js Basics', description: 'Основы серверного JS', status: 'not-started', notes: '', category: 'backend' },
  { id: 5, title: 'Express.js', description: 'Веб-фреймворк для Node.js', status: 'not-started', notes: '', category: 'backend' },
  { id: 6, title: 'REST API', description: 'Проектирование API', status: 'not-started', notes: '', category: 'backend' },
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);  // или 'techTrackerData', если хочешь match старому ключу

  const updateStatus = (id, newStatus) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const updateNotes = (id, notes) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, notes } : t));
  };

  const markAllCompleted = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));

  const resetAll = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));

  const selectRandomNext = () => {
    const pending = technologies.filter(t => t.status !== 'completed');
    if (pending.length === 0) return alert('Все технологии уже изучены!');
    const random = pending[Math.floor(Math.random() * pending.length)];
    alert(`Следующая рекомендуемая: ${random.title}\n${random.description}`);
  };

  const clearAllNotes = () => {
    if (window.confirm('Уверены, что хотите удалить ВСЕ заметки? Это нельзя отменить.')) {
      setTechnologies(prev => prev.map(t => ({ ...t, notes: '' })));
    }
  };

  const progress = technologies.length > 0
    ? Math.round(technologies.filter(t => t.status === 'completed').length / technologies.length * 100)
    : 0;

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    selectRandomNext,
    clearAllNotes,
    progress
  };
}

export default useTechnologies;