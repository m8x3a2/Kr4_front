// src/pages/Settings.js (Самостоятельная работа, Задание 2)
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
  const { markAllCompleted, resetAll, clearAllNotes } = useTechnologies();

  return (
    <div className="page">
      <h1>Настройки</h1>
      
      <h3>Управление данными</h3>
      <button onClick={markAllCompleted}>Отметить все как выполненные</button>
      <button onClick={resetAll}>Сбросить все статусы</button>
      <button onClick={clearAllNotes}>Очистить все заметки</button>
      
      {/* Можно добавить больше настроек, напр. тема, экспорт/импорт данных */}
      <h3>Другие настройки</h3>
      <p>Здесь можно добавить переключатель тем (светлая/темная), но для простоты опущено.</p>
    </div>
  );
}

export default Settings;