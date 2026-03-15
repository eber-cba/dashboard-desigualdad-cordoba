import Papa from 'papaparse';

export const loadData = async () => {
  try {
    const response = await fetch('/dataset_dashboard_v19.csv');
    const text = await response.text();

    const dataset = Papa.parse(text, { 
      header: true, 
      dynamicTyping: true, 
      skipEmptyLines: true 
    }).data;

    // Filter valid rows with coordinates
    const finalData = dataset
      .filter(row => row.barrio && row.centroide_lat !== null && row.centroide_lon !== null)
      .map(row => ({
        ...row,
        lat: row.centroide_lat,
        lon: row.centroide_lon
      }));

    return finalData;
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
};
