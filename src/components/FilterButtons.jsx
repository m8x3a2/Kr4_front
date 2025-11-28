function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'not-started', label: 'Не начато' },
    { key: 'in-progress', label: 'В процессе' },
    { key: 'completed', label: 'Выполнено' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={currentFilter === f.key ? 'active' : ''}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;