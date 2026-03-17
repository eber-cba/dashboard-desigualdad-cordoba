import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const MapUpdater = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const getColor = (perc) => {
  if (perc > 0.8) return '#e11d48';
  if (perc > 0.6) return '#c026d3';
  if (perc > 0.4) return '#9333ea';
  if (perc > 0.2) return '#2563eb';
  return '#0ea5e9';
};

export default function Map({ data, activeVariable }) {
  const center = [-31.4135, -64.1810];

  const values = data.map(d => Number(d[activeVariable.key]) || 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getPercent = (val) => {
    if (maxVal === minVal) return 0.5;
    return (val - minVal) / (maxVal - minVal);
  };

  return (
    <div className="map-container-wrapper">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapUpdater />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
        />

        {data.map((barrio, i) => {
          const val = Number(barrio[activeVariable.key]) || 0;
          const perc = getPercent(val);
          const color = getColor(perc);
          const radius = val === 0 ? 2 : (window.innerWidth < 768 ? 4 : 5) + perc * (window.innerWidth < 768 ? 12 : 18);

          return (
            <CircleMarker
              key={i}
              center={[barrio.lat, barrio.lon]}
              radius={radius}
              fillColor={color}
              color={color}
              weight={1}
              opacity={0.9}
              fillOpacity={0.7}
              className="map-circle-marker"
            >
              <Popup className="custom-popup">
                <div
                  className="popup-content"
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

