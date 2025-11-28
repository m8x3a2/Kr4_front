// src/components/Navigation.js (обновлено с новыми ссылками)
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <h2>Трекер технологий</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/technologies">Список технологий</Link></li>
        <li><Link to="/add">Добавить технологию</Link></li>
        <li><Link to="/statistics">Статистика</Link></li>
        <li><Link to="/settings">Настройки</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;