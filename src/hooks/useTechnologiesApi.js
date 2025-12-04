// src/hooks/useTechnologiesApi.js
import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Маппинг данных из API на структуру технологий
      const mappedTechs = data.map((post, index) => ({
        id: post.id,
        title: post.title.substring(0, 30), // Укорачиваем для примера
        description: post.body.substring(0, 100),
        status: index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'in-progress' : 'not-started',
        notes: ''
      }));
      
      setTechnologies(mappedTechs);
      
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при загрузке технологий:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const refetch = () => {
    fetchTechnologies();
  };

  return { technologies, loading, error, refetch };
}

export default useTechnologiesApi;