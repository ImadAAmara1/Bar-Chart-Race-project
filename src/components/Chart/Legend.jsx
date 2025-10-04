// components/Chart/Legend.jsx
export function Legend({ categories, colorScale, onCategoryHover }) {
  // Vérifier que colorScale existe
  if (!colorScale) return null;

  return (
    <div className="chart-legend">
      <h4 className="legend-title">Catégories</h4>
      <div className="legend-items">
        {categories.map((category) => (
          <div
            key={category}
            className="legend-item"
            onMouseEnter={() => onCategoryHover({ category })}
            onMouseLeave={() => onCategoryHover(null)}
          >
            <div
              className="legend-color"
              style={{ backgroundColor: colorScale(category) }}
            />
            <span className="legend-label">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
