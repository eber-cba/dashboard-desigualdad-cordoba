import React, { useEffect, useState } from 'react';
import { loadData } from './utils/DataLoader';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import { AlertTriangle, School, Bus, Lightbulb, Building, Map as MapIcon, Users } from 'lucide-react';

// Lista de variables maestras para explorar en el WebApp
const VARIABLES = [
  { key: 'pct_nbi', label: 'Pobreza Estructural (% NBI)', icon: AlertTriangle },
  { key: 'poblacion', label: 'Densidad Poblacional', icon: Users },
  { key: 'escuelas_total', label: 'Establecimientos Educativos', icon: School },
  { key: 'paradas_colectivo', label: 'Paradas de Transporte', icon: Bus },
  { key: 'luminarias_reportes', label: 'Luces LED Instaladas', icon: Lightbulb },
  { key: 'centros_vecinales', label: 'Centros Vecinales', icon: Building },
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVariable, setActiveVariable] = useState(VARIABLES[0]);

  useEffect(() => {
    loadData().then(parsedData => {
      setData(parsedData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-slate-300 font-sans">
      
      {/* Menú Lateral */}
      <Sidebar 
        activeVariable={activeVariable} 
        setActiveVariable={setActiveVariable} 
        variables={VARIABLES} 
      />

      {/* Contenedor del Mapa interactivo */}
      <main className="flex-1 relative h-full bg-slate-950">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <MapIcon className="w-12 h-12 text-sky-500 animate-pulse" />
            <h2 className="text-xl font-medium tracking-wide text-slate-400">Cargando datos espaciales...</h2>
          </div>
        ) : (
          <Map data={data} activeVariable={activeVariable} />
        )}
      </main>

    </div>
  );
}

export default App;
