// hooks/useCSVData.js
import { useEffect, useState } from "react";
import * as d3 from "d3";

export function useCSVData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Commencer à true
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const rows = await d3.csv("/data/category-brands.csv");

        const processed = rows.map((row) => ({
          date: row.date,
          name: row.name,
          category: row.category,
          value: +row.value, // IMPORTANT: Conversion en number
        }));

        setData(processed);
      } catch (err) {
        console.error("Erreur chargement données:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
}
