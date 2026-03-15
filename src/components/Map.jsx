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

// Paleta de colores calor de amarillo a morado neón para heatmap (NBI)
const getColor = (value, max) => {
  // Para que no de NaN
  if (!max || max === 0) return '#0ea5e9'; // cyan normal
  const perc = value / max;
  // de cyan -> púrpura -> rosa neon -> rojo intenso
  if (perc > 0.8) return '#e11d48'; // rose-600
  if (perc > 0.6) return '#c026d3'; // fuchsia-600
  if (perc > 0.4) return '#9333ea'; // purple-600
  if (perc > 0.2) return '#2563eb'; // blue-600
  return '#0ea5e9'; // sky-500
};

export default function Map({ data, activeVariable }) {
  // Config: Coordenadas de Córdoba Centro
  const center = [-31.4135, -64.1810];
  const maxVal = Math.max(...data.map(d => d[activeVariable.key] || 0));

  return (
    <div className="h-full w-full">
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {data.map((barrio, i) => {
          const val = barrio[activeVariable.key] || 0;
          return (
            <CircleMarker
              key={i}
              center={[barrio.lat, barrio.lon]}
              radius={val === 0 ? 0 : 5 + (val / maxVal) * 15}
              fillColor={getColor(val, maxVal)}
              color={getColor(val, maxVal)}
              weight={1}
              opacity={0.8}
              fillOpacity={0.6}
            >
              <Popup>
                <div className="font-sans text-sm p-1">
                  <h3 className="font-bold text-lg mb-1">{barrio.barrio}</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-slate-300">
                    <span className="font-semibold text-slate-400">Población:</span>
                    <span className="text-right">{barrio.poblacion}</span>
                    <span className="font-semibold text-rose-400">% NBI:</span>
                    <span className="text-right text-rose-400 font-bold">{barrio.pct_nbi}%</span>
                    <hr className="col-span-2 border-slate-700 my-1" />
                    <span className="font-semibold text-slate-400">Escuelas (Tot):</span>
                    <span className="text-right text-sky-400 font-semibold">{barrio.escuelas_total}</span>
                    <span className="font-semibold text-slate-400">Paradas Transp:</span>
                    <span className="text-right text-sky-400 font-semibold">{barrio.paradas_colectivo}</span>
                    <span className="font-semibold text-slate-400">Luces LED:</span>
                    <span className="text-right">{barrio.luminarias_reportes}</span>
                    <span className="font-semibold text-slate-400">Centros Vecinales:</span>
                    <span className="text-right">{barrio.centros_vecinales}</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
