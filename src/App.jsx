import React, { useEffect, useState } from 'react';
import { loadData } from './utils/DataLoader';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import WelcomeModal from './components/WelcomeModal';
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
  const [showWelcome, setShowWelcome] = useState(true); // Estado inicial en true

  useEffect(() => {
    loadData().then(parsedData => {
      setData(parsedData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 text-slate-300 font-sans">
      
      {/* Capa Base: Mapa interactivo (Ocupa 100% de la pantalla) */}
      <main className="absolute inset-0 z-0">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-slate-950 z-50">
            <MapIcon className="w-12 h-12 text-sky-500 animate-pulse drop-shadow-lg" />
            <h2 className="text-xl font-medium tracking-wide text-slate-400">Cargando datos espaciales...</h2>
          </div>
        ) : (
          <Map data={data} activeVariable={activeVariable} />
        )}
      </main>

      {/* Capa UI Flotante: Sidebar Glassmorphism */}
      <div className={`absolute bottom-0 md:top-0 left-0 w-full md:w-96 h-auto md:h-full z-[1000] p-4 md:p-6 pointer-events-none flex flex-col justify-end md:justify-start transition-opacity duration-500 ${showWelcome ? 'opacity-0' : 'opacity-100'}`}>
        <Sidebar 
          activeVariable={activeVariable} 
          setActiveVariable={setActiveVariable} 
          variables={VARIABLES} 
        />
      </div>

      {/* Capa Modal de Bienvenida (Z-Index Máximo) */}
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

    </div>
  );
}

export default App;
