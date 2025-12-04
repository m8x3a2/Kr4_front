import { Box, Container, Typography } from '@mui/material';

function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Добро пожаловать в трекер технологий!
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Здесь вы можете отслеживать свой прогресс изучения фронтенда и бэкенда.
        </Typography>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Возможности приложения:
          </Typography>

          <Box
            component="ul"
            sx={{
              pl: 4,
              fontSize: '1.2rem',
              lineHeight: 2.2,
              '& li': { mb: 1 }
            }}
          >
            <li>Добавление и удаление технологий</li>
            <li>Отметка статуса: Не начато → В процессе → Изучено</li>
            <li>Заметки к каждой технологии</li>
            <li>Установка дедлайнов</li>
            <li>Прогресс-бар и статистика</li>
            <li>Массовое редактирование (галочки)</li>
            <li>Тёмная / светлая тема</li>
            <li>Snackbar-уведомления</li>
            <li>Экспорт и импорт данных</li>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;