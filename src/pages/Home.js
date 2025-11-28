function Home() {
  return (
    <div className="page">
      <h1>Добро пожаловать в трекер технологий!</h1>
      <p>Здесь вы можете отслеживать свой прогресс изучения фронтенда и бэкенда.</p>
      <div className="features">
        <h2>Возможности:</h2>
        <ul>
          <li>Добавление новых технологий</li>
          <li>Отметка статуса изучения</li>
          <li>Просмотр детальной информации</li>
          <li>Данные сохраняются в localStorage</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;