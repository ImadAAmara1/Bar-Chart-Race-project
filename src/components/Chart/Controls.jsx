export function Controls({
  currentYear,
  years,
  isPlaying,
  hasCompletedAnimation,
  onPlayPause,
  onReset,
  onYearChange,
}) {
  return (
    <div className="chart-controls">
      <div className="control-group">
        <button
          onClick={onPlayPause}
          className={`control-btn play-pause ${
            hasCompletedAnimation ? "completed" : ""
          }`}
        >
          {hasCompletedAnimation
            ? "▶ Lecture"
            : isPlaying
            ? "⏸ Pause"
            : "▶ Lecture"}
        </button>
        <button onClick={onReset} className="control-btn reset">
          ⏹ Reset
        </button>
      </div>

      <div className="control-group">
        <label className="control-label">
          Année: <strong>{currentYear.slice(0, 4)}</strong>
        </label>
        <input
          type="range"
          min={years[0]?.slice(0, 4) || "2000"}
          max={years[years.length - 1]?.slice(0, 4) || "2019"}
          value={currentYear.slice(0, 4)}
          onChange={onYearChange}
          className="year-slider"
        />
      </div>
    </div>
  );
}
