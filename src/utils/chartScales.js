import * as d3 from "d3";

export function createScales(
  currentYearData,
  categories,
  innerWidth,
  innerHeight
) {
  // Vérifications avant de créer les échelles
  if (
    !currentYearData ||
    !currentYearData.length ||
    !innerWidth ||
    !innerHeight ||
    innerWidth <= 0 ||
    innerHeight <= 0
  ) {
    return {};
  }

  try {
    const maxValue = d3.max(currentYearData, (d) => +d.value) * 1.1;
    const names = currentYearData.map((d) => d.name);

    // Vérifier que les noms et valeurs sont valides
    if (!names.length || isNaN(maxValue) || maxValue <= 0) {
      return {};
    }

    const xScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleBand()
      .domain(names)
      .range([0, innerHeight])
      .padding(0.2);

    return { xScale, yScale };
  } catch (error) {
    console.error("Erreur création échelles D3:", error);
    return {};
  }
}
