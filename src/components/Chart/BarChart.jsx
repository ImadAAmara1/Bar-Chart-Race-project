// components/Chart/BarChart.jsx (Version alternative)
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { createScales } from "../../utils/chartScales";

export function BarChart({
  currentYearData,
  currentYear,
  categories,
  colorScale,
  innerWidth,
  innerHeight,
  margin,
  onBarHover,
}) {
  const gRef = useRef(null);
  const previousOrderRef = useRef([]);

  const { xScale, yScale } = createScales(
    currentYearData,
    categories,
    innerWidth,
    innerHeight
  );

  useEffect(() => {
    if (!currentYearData.length || !xScale || !yScale || !colorScale) return;

    const t = d3.transition().duration(800).ease(d3.easeCubicOut);
    const g = d3.select(gRef.current);

    // Déterminer l'ordre précédent pour l'animation
    const currentOrder = currentYearData.map((d) => d.name);
    const previousOrder = previousOrderRef.current;
    previousOrderRef.current = currentOrder;

    // Barres
    const bars = g.selectAll("rect").data(currentYearData, (d) => d.name);

    // ENTER - Nouvelles barres depuis le bas
    bars
      .enter()
      .append("rect")
      .attr("fill", (d) => colorScale(d.category))
      .attr("x", 0)
      .attr("y", innerHeight + 50) // Commence en bas avec un décalage
      .attr("height", 0)
      .attr("width", 0)
      .attr("rx", 3)
      .attr("ry", 3)
      .style("opacity", 0)
      .on("mouseenter", function (event, d) {
        onBarHover(d, event);
        d3.select(this).style("opacity", 0.8);
      })
      .on("mouseleave", function () {
        onBarHover(null);
        d3.select(this).style("opacity", 1);
      })
      .merge(bars)
      .transition(t)
      .attr("y", (d) => yScale(d.name))
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d.value))
      .style("opacity", 1);

    // EXIT - Barres qui descendent vers le bas
    bars
      .exit()
      .transition(t)
      .attr("y", innerHeight + 100)
      .attr("height", 0)
      .attr("width", 0)
      .style("opacity", 0)
      .remove();

    // Labels des noms avec animation depuis le bas
    const nameLabels = g
      .selectAll("text.name-label")
      .data(currentYearData, (d) => d.name);

    nameLabels
      .enter()
      .append("text")
      .attr("class", "name-label")
      .attr("text-anchor", "end")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "#2c3e50")
      .attr("dy", "0.35em")
      .attr("x", -10)
      .attr("y", innerHeight + 50)
      .style("opacity", 0)
      .merge(nameLabels)
      .transition(t)
      .attr("y", (d) => yScale(d.name) + yScale.bandwidth() / 2)
      .style("opacity", 1)
      .text((d) => d.name);

    nameLabels
      .exit()
      .transition(t)
      .attr("y", innerHeight + 100)
      .style("opacity", 0)
      .remove();

    // Labels des valeurs avec animation depuis le bas
    const valueLabels = g
      .selectAll("text.value-label")
      .data(currentYearData, (d) => d.name);

    valueLabels
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .attr("dy", "0.35em")
      .attr("x", (d) => xScale(d.value) - 10)
      .attr("text-anchor", "end")
      .attr("y", innerHeight + 50)
      .style("opacity", 0)
      .merge(valueLabels)
      .transition(t)
      .attr("y", (d) => yScale(d.name) + yScale.bandwidth() / 2)
      .style("opacity", 1)
      .tween("text", function (d) {
        const element = d3.select(this);
        const previousValue = +element.text().replace(/,/g, "") || 0;
        const interpolator = d3.interpolateNumber(previousValue, +d.value);
        return (t) => {
          const currentValue = Math.round(interpolator(t));
          element.text(d3.format(",")(currentValue));
          element.attr("x", Math.max(xScale(currentValue) - 10, 20));
        };
      });

    valueLabels
      .exit()
      .transition(t)
      .attr("y", innerHeight + 100)
      .style("opacity", 0)
      .remove();
  }, [currentYearData, xScale, yScale, colorScale, onBarHover, innerHeight]);

  return (
    <svg
      width={innerWidth + margin.left + margin.right}
      height={innerHeight + margin.top + margin.bottom}
      className="bar-chart-svg"
    >
      <g ref={gRef} transform={`translate(${margin.left}, ${margin.top})`} />

      <text
        x={innerWidth + 1.4 * margin.right}
        y={innerHeight + margin.bottom + 5}
        textAnchor="middle"
        fontSize="60px"
        fill="black"
        fontWeight="bold"
        className="year-background"
        style={{ opacity: 0.8 }}
      >
        {currentYear?.slice(0, 4) || "2000"}
      </text>
    </svg>
  );
}
