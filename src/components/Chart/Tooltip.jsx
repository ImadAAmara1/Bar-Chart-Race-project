import * as d3 from "d3";

export function Tooltip({ hoveredItem, currentYear, currentYearData }) {
  if (!hoveredItem || !hoveredItem.name) return null;

  const position =
    currentYearData.findIndex((d) => d.name === hoveredItem.name) + 1;

  return (
    <div
      className="chart-tooltip"
      style={{
        left: hoveredItem.clientX + 10,
        top: hoveredItem.clientY - 10,
      }}
    >
      <div className="tooltip-header">{hoveredItem.name}</div>
      <div className="tooltip-content">
        <div>Catégorie: {hoveredItem.category}</div>
        <div>Valeur: {d3.format(",")(hoveredItem.value)}</div>
        <div>Année: {currentYear.slice(0, 4)}</div>
      </div>
    </div>
  );
}
