import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Componente para re-centrar el mapa (opcional) o forzar actualización de tamaño
const MapUpdater = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

// Paleta de colores calor de azul a morado neón para heatmap (0 -> 1)
const getColor = (perc) => {
  if (perc > 0.8) return '#e11d48'; // rose-600
  if (perc > 0.6) return '#c026d3'; // fuchsia-600
  if (perc > 0.4) return '#9333ea'; // purple-600
  if (perc > 0.2) return '#2563eb'; // blue-600
  return '#0ea5e9'; // sky-500
};

export default function Map({ data, activeVariable }) {
  // Config: Coordenadas de Córdoba Centro
  const center = [-31.4135, -64.1810];
  
  // Encontrar Mínimos y Máximos dinámicos excluyendo nulos u outliers extremos
  const values = data.map(d => Number(d[activeVariable.key]) || 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getPercent = (val) => {
    if (maxVal === minVal) return 0.5;
    return (val - minVal) / (maxVal - minVal);
  };

  return (
    <div className="h-full w-full tour-step-5-map">
      <MapContainer 
        center={center} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapUpdater />
        {/* TileLayer Modo Oscuro (CartoDB Dark Matter) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
        />

        {data.map((barrio, i) => {
          const val = Number(barrio[activeVariable.key]) || 0;
          const perc = getPercent(val);
          const color = getColor(perc);
          
          return (
            <CircleMarker
              key={i}
              center={[barrio.lat, barrio.lon]}
              radius={val === 0 ? 3 : 5 + perc * 18}
              fillColor={color}
              color={color}
              weight={1}
              opacity={0.9}
              fillOpacity={0.7}
              className="transition-all duration-300 pointer-events-auto"
            >
              <Popup className="custom-popup">
                {/* Renderizar directamente el tooltip_html generado por Urban Data Science V19 en Python */}
                <div 
                  className="font-sans text-sm p-2 text-slate-800"
                  dangerouslySetInnerHTML={{ __html: barrio.tooltip_html || `<b>${barrio.barrio}</b>` }}
                />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

