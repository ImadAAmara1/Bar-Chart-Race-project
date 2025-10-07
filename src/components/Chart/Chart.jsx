import { useEffect } from "react";
import { useChartData } from "../../hooks/useChartData";
import { BarChart } from "./BarChart";
import { Controls } from "./Controls";
import { Legend } from "./Legend";
import { Tooltip } from "./Tooltip";
import "../../styles/chart.css";

export function Chart() {
  // Configuration
  const margin = { top: 60, bottom: 50, left: 180, right: 200 };
  const w = 1000;
  const h = 600;
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;
  const animationSpeed = 1000;

  // Hook personnalisé pour la logique métier
  const {
    currentYear,
    setCurrentYear,
    isPlaying,
    setIsPlaying,
    hoveredItem,
    setHoveredItem,
    hasCompletedAnimation,
    setHasCompletedAnimation,
    loading,
    error,
    currentYearData,
    years,
    categories,
    colorScale,
    handlePlayPause,
    handleReset,
    handleYearChange,
  } = useChartData();

  // Animation automatique
  useEffect(() => {
    if (!isPlaying || !years.length) return;

    const interval = setInterval(() => {
      setCurrentYear((prev) => {
        const currentIndex = years.indexOf(prev);

        // Si on est à la dernière année
        if (currentIndex >= years.length - 1) {
          setIsPlaying(false);
          setHasCompletedAnimation(true); // Marquer l'animation comme terminée
          return prev; // Rester sur la dernière année
        }

        // Passer à l'année suivante
        return years[currentIndex + 1];
      });
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [
    isPlaying,
    years,
    animationSpeed,
    setCurrentYear,
    setIsPlaying,
    setHasCompletedAnimation,
  ]);

  // Gestion du hover
  const handleBarHover = (item, event) => {
    if (item && event) {
      setHoveredItem({
        ...item,
        clientX: event.clientX,
        clientY: event.clientY,
      });
    } else {
      setHoveredItem(null);
    }
  };

  const handleCategoryHover = (item) => {
    setHoveredItem(item);
  };

  if (loading)
    return <div className="chart-loading">Chargement des données...</div>;

  if (error) return <div className="chart-error">Erreur: {error.message}</div>;

  if (!currentYearData.length)
    return <div className="chart-no-data">Aucune donnée disponible</div>;

  return (
    <div className="chart-container">
      {/* Contrôles */}
      <Controls
        currentYear={currentYear}
        years={years}
        isPlaying={isPlaying}
        hasCompletedAnimation={hasCompletedAnimation}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onYearChange={handleYearChange}
      />

      {/* Zone du graphique */}
      <div className="chart-content">
        {/* Graphique */}
        <div className="chart-visualization">
          <BarChart
            currentYearData={currentYearData}
            currentYear={currentYear}
            categories={categories}
            colorScale={colorScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            margin={margin}
            onBarHover={handleBarHover}
          />
        </div>

        {/* Légende */}
        <div className="chart-sidebar">
          <Legend
            categories={categories}
            colorScale={colorScale}
            onCategoryHover={handleCategoryHover}
          />
        </div>
      </div>

      {/* Tooltip */}
      <Tooltip
        hoveredItem={hoveredItem}
        currentYear={currentYear}
        currentYearData={currentYearData}
      />
    </div>
  );
}
