// hooks/useChartData.js
import { useState, useMemo } from "react";
import { useCSVData } from "./useCSVData";
import * as d3 from "d3";

export function useChartData() {
  const { data, loading, error } = useCSVData();
  const [currentYear, setCurrentYear] = useState("2000-01-01");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hasCompletedAnimation, setHasCompletedAnimation] = useState(false);

  // Données mémoïsées avec colorScale
  const { currentYearData, years, categories, colorScale } = useMemo(() => {
    if (!data.length)
      return {
        currentYearData: [],
        years: [],
        categories: [],
        colorScale: null,
      };

    const allYears = Array.from(new Set(data.map((d) => d.date))).sort();

    const currentData = data
      .filter((d) => d.date === currentYear)
      .sort((a, b) => b.value - a.value)
      .slice(0, 12);

    const allCategories = Array.from(new Set(data.map((d) => d.category)));

    const colorScale = d3
      .scaleOrdinal()
      .domain(allCategories)
      .range(d3.schemeTableau10);

    return {
      currentYearData: currentData,
      years: allYears,
      categories: allCategories,
      colorScale,
    };
  }, [data, currentYear]);

  // Gestion des contrôles
  const handlePlayPause = () => {
    // Si l'animation est terminée et on clique sur Lecture, recommencer depuis le début
    if (hasCompletedAnimation && !isPlaying) {
      setCurrentYear(years[0] || "2000-01-01");
      setHasCompletedAnimation(false);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentYear(years[0] || "2000-01-01");
    setHasCompletedAnimation(false);
  };

  const handleYearChange = (event) => {
    const selectedYear = `${event.target.value}-01-01`;
    setCurrentYear(selectedYear);
    // Si l'utilisateur change manuellement l'année, réinitialiser le statut d'animation complétée
    if (hasCompletedAnimation) {
      setHasCompletedAnimation(false);
    }
  };

  return {
    // États
    currentYear,
    setCurrentYear,
    isPlaying,
    setIsPlaying,
    hoveredItem,
    setHoveredItem,
    hasCompletedAnimation,
    setHasCompletedAnimation,

    // Données
    data,
    loading,
    error,
    currentYearData,
    years,
    categories,
    colorScale,

    // Handlers
    handlePlayPause,
    handleReset,
    handleYearChange,
  };
}
