// src/hooks/useTechnologiesApi.js — с таймаутом 8 сек

import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 секунд

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10',
        { signal: controller.signal }
      );

      clearTimeout(timeoutId); // очищаем таймер, если успел

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      const mappedTechs = data.map((post, index) => ({
        id: post.id,
        title: post.title.substring(0, 40),
        description: post.body.substring(0, 120),
        status: index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'in-progress' : 'not-started',
        notes: '',
        deadline: ''
      }));

      setTechnologies(mappedTechs);

    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        setError('Превышен таймаут загрузки (8 сек)');
      } else if (!navigator.onLine) {
        setError('Нет подключения к интернету');
      } else {
        setError(err.message || 'Не удалось загрузить данные');
      }
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