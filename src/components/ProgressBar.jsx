function ProgressBar({ progress, label = "Прогресс", color = "#4CAF50", height = 20 }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', height }}>
        <div
          style={{
            width: `${progress}%`,
            background: color,
            height: '100%',
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;