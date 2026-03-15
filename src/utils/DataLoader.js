import Papa from 'papaparse';

export const loadData = async () => {
  try {
    const [datasetRes, centroidsRes] = await Promise.all([
      fetch('/dataset_final_v6.csv'),
      fetch('/centroides_barrios_completo.csv')
    ]);
    
    const datasetText = await datasetRes.text();
    const centroidsText = await centroidsRes.text();

    const dataset = Papa.parse(datasetText, { header: true, dynamicTyping: true, skipEmptyLines: true }).data;
    const centroids = Papa.parse(centroidsText, { header: true, dynamicTyping: true, skipEmptyLines: true }).data;

    // Crear map de centroides
    const centroidMap = new Map();
    centroids.forEach(c => {
      if (c.barrio) {
         centroidMap.set(c.barrio.trim().toUpperCase(), { lat: c.centroide_lat, lon: c.centroide_lon });
      }
    });

    // Joinear dataset con centroides
    const finalData = dataset.map(row => {
      if (!row.barrio) return null;
      const key = row.barrio.trim().toUpperCase();
      const coords = centroidMap.get(key);
      return {
        ...row,
        lat: coords ? coords.lat : null,
        lon: coords ? coords.lon : null
      };
    }).filter(row => row && row.lat !== null && row.lon !== null);

    return finalData;
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
};
