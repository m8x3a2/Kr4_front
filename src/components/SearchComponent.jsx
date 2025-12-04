// src/components/SearchComponent.jsx (Задание 1: Компонент поиска с debounce)
import { useState, useEffect } from 'react';
import { debounce } from 'lodash'; // Предполагаем, что lodash установлен

function SearchComponent({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = debounce(async (searchQuery) => {
    if (!searchQuery) {
      onSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?body_like=${searchQuery}`);
      
      if (!response.ok) {
        throw new Error('Ошибка поиска');
      }
      
      const data = await response.json();
      const results = data.map(post => ({
        id: post.id,
        title: post.title,
        description: post.body
      }));
      
      onSearchResults(results);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, 500); // Задержка 500ms

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel(); // Отмена предыдущих запросов
  }, [query]);

  return (
    <div className="search-component">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск технологий..."
      />
      {loading && <p>Поиск...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SearchComponent;