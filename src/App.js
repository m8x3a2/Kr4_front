// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import AddTechnology from './pages/AddTechnology';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useTechnologiesApi from './hooks/useTechnologiesApi';

import './App.css';

function App() {
  const { technologies, loading, error, refetch } = useTechnologiesApi();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f5f7fa',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <div style={{
          border: '8px solid #f3f3f3',
          borderTop: '8px solid #3498db',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <p style={{ fontSize: '1.2em', color: '#555' }}>Загрузка технологий...</p>
      </div>
    );
  }

  return (
    <Router>
      <Navigation />

      {/* Глобальное сообщение об ошибке и кнопка обновления */}
      {error && (
        <div style={{
          background: '#e74c3c',
          color: 'white',
          padding: '15px 20px',
          textAlign: 'center',
          fontSize: '1.1em'
        }}>
          Ошибка загрузки данных: {error}
          <button
            onClick={refetch}
            style={{
              marginLeft: '20px',
              background: 'white',
              color: '#e74c3c',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Попробовать снова
          </button>
        </div>
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<TechnologyList technologies={technologies} />} />
          <Route path="/technologies/:id" element={<TechnologyDetail technologies={technologies} />} />
          <Route path="/add" element={<AddTechnology />} />
          <Route path="/statistics" element={<Statistics technologies={technologies} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </Router>
  );
}

// Добавляем анимацию спиннера
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

export default App;