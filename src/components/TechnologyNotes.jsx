function TechnologyNotes({ notes, onNotesChange, techId }) {
  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты, ссылки, инсайты..."
        rows="4"
      />
      <small>
        {notes.length > 0 
          ? `Заметка сохранена (${notes.length} симв.)` 
          : 'Заметок пока нет'}
      </small>
    </div>
  );
}

export default TechnologyNotes;