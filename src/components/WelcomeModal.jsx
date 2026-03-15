import React from 'react';
import { Map, Zap, Layers, BarChart3, Info, X } from 'lucide-react';

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4 pointer-events-auto">
      
      {/* Caja Principal Glassmorphism */}
      <div className="relative w-full max-w-2xl bg-slate-900/90 border border-slate-700 shadow-2xl shadow-sky-900/20 rounded-3xl p-6 md:p-10 overflow-hidden">
        
        {/* Efecto de resplandor neón en el fondo de la caja */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-sky-500/10 blur-[60px] pointer-events-none"></div>

        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header (Título) */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl shadow-lg ring-1 ring-white/20">
            <Map className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400 tracking-tight">
              Bienvenido al Dashboard
            </h2>
            <p className="text-sky-400/80 text-sm font-semibold tracking-widest uppercase mt-1">
              Desigualdad Urbana en Córdoba
            </p>
          </div>
        </div>

        {/* Cuerpo del Texto */}
        <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed relative z-10">
          <p>
            Esta plataforma interactiva permite explorar visualmente datos territoriales cruzando la <strong>pobreza estructural (Censo)</strong> con la infraestructura de <strong>servicios públicos municipal (2023)</strong> a lo largo de 495 barrios oficiales de la Capital.
          </p>

          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-400" />
              ¿Cómo usar esta herramienta?
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Usa el <strong>Panel Izquierdo</strong> para cambiar la capa de datos. Cada botón representa una variable distinta (Ej: Escuelas, Salud, Transporte).</span>
              </li>
              <li className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Los círculos en el mapa (<strong>Heatmap</strong>) cambiarán de tamaño y color. Los tonos de azul oscuro indican valores bajos, mientras que los tonos <strong>Morados y Rojos Neón</strong> indican alta concentración.</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Haz clic o pasa el ratón (<strong>Hover</strong>) sobre cualquier círculo para ver la Ficha Técnica exacta de dicho barrio.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Botón de Acción Principal (Call to Action) */}
        <div className="mt-8 flex justify-end relative z-10">
          <button 
            onClick={onClose}
            className="group relative px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl ring-1 ring-sky-500/50 hover:ring-sky-400 transition-all shadow-lg hover:shadow-sky-500/25 overflow-hidden"
          >
             <span className="relative z-10 flex items-center gap-2">
               Comenzar a explorar
             </span>
             {/* Efecto de luz pasando por arriba del botón */}
             <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-sky-400/0 via-sky-400/20 to-sky-400/0 group-hover:w-full group-hover:transition-all group-hover:duration-500 ease-out"></div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default WelcomeModal;
