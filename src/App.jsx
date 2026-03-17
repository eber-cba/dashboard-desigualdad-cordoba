import React, { useEffect, useState } from 'react';
import { loadData } from './utils/DataLoader';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import WelcomeModal from './components/WelcomeModal';
import Legend from './components/Legend';
import Joyride, { STATUS } from 'react-joyride';
import { AlertTriangle, School, Bus, Lightbulb, Building, Map as MapIcon, Users, Activity, Shield } from 'lucide-react';

// Lista de variables maestras para explorar en el WebApp
const VARIABLES = [
  { key: 'infraestructura_score', label: 'Índice de Infraestructura (Score)', icon: MapIcon, desc: 'Índice ponderado de acceso a transporte, educación, salud y seguridad.' },
  { key: 'pct_nbi', label: 'Vulnerabilidad Social (% NBI)', icon: AlertTriangle, desc: 'Porcentaje de hogares con Necesidades Básicas Insatisfechas.' },
  { key: 'densidad_poblacional', label: 'Densidad Poblacional (Hab/Km2)', icon: Users, desc: 'Cantidad de habitantes por kilómetro cuadrado.' },
  { key: 'tamano_promedio_hogar', label: 'Hacinamiento (Hab/Hogar)', icon: Users, desc: 'Promedio de personas viviendo en un mismo hogar.' },
  { key: 'escuelas_por_1000_hab', label: 'Cobertura Educativa (x1000)', icon: School, desc: 'Cantidad de escuelas disponibles por cada 1000 habitantes.' },
  { key: 'paradas_por_1000_hab', label: 'Cobertura de Transporte (x1000)', icon: Bus, desc: 'Cantidad de paradas de colectivo por cada 1000 habitantes.' },
  { key: 'dispensarios_municipales', label: 'Dispensarios Municipales', icon: Activity, desc: 'Cantidad de centros de atención primaria de salud municipal.' },
  { key: 'comisarias', label: 'Comisarías', icon: Shield, desc: 'Dependencias policiales en el territorio.' }
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVariable, setActiveVariable] = useState(VARIABLES[0]);
  const [showWelcome, setShowWelcome] = useState(true); // Estado inicial en true
  const [runTour, setRunTour] = useState(false);
  const [showLegend, setShowLegend] = useState(window.innerWidth > 768);

  // Configuración del Guided Tour (Pasos referenciando tutorial-classes)
  const [{ steps }] = useState({
    steps: [
      {
        target: '.tour-step-1-welcome',
        content: '👋 ¡Bienvenido al Visor V19! La ciudad de Córdoba analizada barrialmente. Comienza cerrando este cartel para darte un pequeño tour.',
        disableBeacon: true,
        placement: 'center',
      },
      {
        target: '.tour-step-2-dashboard',
        content: '📊 Este panel lateral es tu control. Elegí cualquier variable socio-urbana y el mapa se repintará automáticamente.',
        placement: 'right',
      },
      {
        target: '.tour-step-3-vulnerability',
        content: '🚨 Por ejemplo, al tocar "Vulnerabilidad Social (% NBI)" verás en rojo oscuro qué barrios de la periferia sufren más las necesidades básicas insatisfechas.',
        placement: 'bottom',
      },
      {
        target: '.tour-step-4-schools',
        content: '🏫 Si luego tocás "Cobertura Educativa", verás empíricamente que faltan escuelas exactamente donde más vulnerabilidad hay. ¡Ese es el poder de cruzar datos!',
        placement: 'bottom',
      },
      {
        target: '.tour-step-5-map',
        content: '🗺️ Navegá libremente. El mapa es infinito. Acordate que como analista de datos podés usar esta plataforma para sugerir políticas públicas de alto impacto. ¡A investigar!',
        placement: 'center',
      }
    ]
  });

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    }
  };

  useEffect(() => {
    loadData().then(parsedData => {
      setData(parsedData);
      setLoading(false);
    });
  }, []);

  const closeWelcomeInitTour = () => {
    setShowWelcome(false);
    // Damos timeout mínimo para la animación de cierre del welcome
    setTimeout(() => {
      setRunTour(true);
    }, 500);
  };

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-slate-950 text-slate-300 font-sans select-none">
      
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

      {/* Capa UI Flotante: Sidebar (Bottom Sheet en Mobile) */}
      <div 
        className={`
          absolute bottom-0 left-0 w-full md:top-0 md:left-0 md:w-[360px] md:h-full z-[1000] 
          md:p-6 pointer-events-none flex flex-col justify-end md:justify-start 
          transition-all duration-700 
          ${showWelcome ? 'translate-y-full md:translate-y-0 md:-translate-x-full' : 'translate-y-0 md:translate-x-0'}
        `}
      >
        <Sidebar 
          activeVariable={activeVariable} 
          setActiveVariable={setActiveVariable} 
          variables={VARIABLES} 
        />
      </div>

      {/* Capa UI Flotante: Leyenda (Guía) */}
      {!showWelcome && (
        <div className="absolute top-4 right-4 md:top-auto md:bottom-10 md:right-10 w-fit z-[1000] pointer-events-none">
          <div className="flex flex-col items-end gap-3">
            {/* Botón flotante para la Leyenda en Mobile */}
            <button 
              onClick={() => setShowLegend(!showLegend)}
              className="md:hidden pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-sky-500/30 rounded-full shadow-lg text-sky-400 backdrop-blur-md active:scale-95 transition-all text-xs font-bold uppercase tracking-wider"
            >
              <Activity className="w-4 h-4" />
              {showLegend ? 'Ocultar Guía' : 'Ver Guía'}
            </button>
            
            <div className={`
              w-[240px] md:w-[300px] transition-all duration-500 origin-top-right
              ${showLegend ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none md:opacity-100 md:scale-100 md:pointer-events-auto'}
            `}>
              <Legend activeVariable={activeVariable} onCloseMobile={() => setShowLegend(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Capa Modal de Bienvenida (Z-Index Máximo) */}
      {showWelcome && (
        <div className="tour-step-1-welcome">
          <WelcomeModal onClose={closeWelcomeInitTour} />
        </div>
      )}

      {/* Guided Tour Component */}
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={runTour}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        disableScrolling={window.innerWidth < 768}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#0ea5e9',
            backgroundColor: '#0f172a',
            textColor: '#f1f5f9',
            arrowColor: '#0f172a',
            width: window.innerWidth < 768 ? 'calc(100vw - 40px)' : 380,
          },
          tooltip: {
            padding: '12px',
            borderRadius: '16px',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            borderRadius: '8px',
            fontSize: '14px',
            padding: '8px 16px',
          },
          buttonBack: {
            color: '#94a3b8',
            marginRight: '10px',
            fontSize: '14px',
          },
          buttonSkip: {
            fontSize: '14px',
          }
        }}
      />

    </div>
  );
}

export default App;
