// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import AddTechnology from './pages/AddTechnology';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useTechnologies from './hooks/useTechnologies';

import './App.css';

function App() {
  const techHook = useTechnologies(); // Хук для технологий, чтобы передать пропсы

  return (
    <Router>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<TechnologyList {...techHook} />} />
          <Route path="/technologies/:id" element={<TechnologyDetail {...techHook} />} />
          <Route path="/add" element={<AddTechnology {...techHook} />} />
          <Route path="/statistics" element={<Statistics {...techHook} />} />
          <Route path="/settings" element={<Settings {...techHook} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;