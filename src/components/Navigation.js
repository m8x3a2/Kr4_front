// src/components/Navigation.js
import { NavLink } from 'react-router-dom';
import './Navigation.css'; // создадим новый файл

function Navigation() {
  return (
    <nav className="top-nav">
      <div className="nav-container">
        <h1 className="nav-logo">Трекер технологий</h1>
        <ul className="nav-menu">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Главная</NavLink></li>
          <li><NavLink to="/technologies" className={({ isActive }) => isActive ? 'active' : ''}>Список технологий</NavLink></li>
          <li><NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>Добавить технологию</NavLink></li>
          <li><NavLink to="/statistics" className={({ isActive }) => isActive ? 'active' : ''}>Статистика</NavLink></li>
          <li><NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Настройки</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;