import React from 'react';
import { Map, Activity, School, Bus, Lightbulb, Shield, Users, Building, AlertTriangle } from 'lucide-react';

const Sidebar = ({ activeVariable, setActiveVariable, variables }) => {
  return (
    <div className="w-full h-auto max-h-[40vh] md:max-h-full md:h-full bg-slate-900/70 backdrop-blur-2xl border border-slate-700/50 shadow-2xl rounded-3xl text-slate-200 p-5 md:p-7 flex flex-col pointer-events-auto overflow-y-auto">
      
      {/* HEADER */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="p-2.5 bg-sky-500/20 rounded-xl ring-1 ring-sky-500/30">
            <Map className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">Desigualdad Urbana</h1>
            <p className="text-xs text-sky-400/80 font-medium tracking-wider uppercase">Córdoba Capital</p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 mb-6 leading-relaxed hidden md:block">
          Exploración interactiva cruzando datos del Censo con infraestructura de servicios públicos 2023.
        </p>

        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
          Variable a Visualizar
        </h2>
        
        {/* VARIABLE SELECTOR */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
          {variables.map((v) => {
            const Icon = v.icon;
            const isActive = activeVariable.key === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setActiveVariable(v)}
                className={`flex items-center gap-3 px-4 py-3 min-w-max md:min-w-0 rounded-2xl transition-all duration-300 ease-out text-sm ${
                  isActive 
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/10 text-sky-300 ring-1 ring-sky-400/50 shadow-lg shadow-sky-900/20 scale-[1.02]' 
                    : 'bg-slate-800/40 hover:bg-slate-700/50 text-slate-400 hover:text-slate-100 ring-1 ring-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="font-semibold tracking-wide">{v.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FOOTER PROFILE - Escondido en mobile muy chico, visible en md */}
      <div className="mt-auto hidden md:block pt-6 border-t border-slate-700/50">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Ingeniería & Datos</h3>
        
        <div className="bg-slate-950/40 rounded-2xl p-4 ring-1 ring-white/10 hover:ring-sky-500/30 transition-all duration-300">
          <p className="text-white font-bold tracking-wide">Eber Coronel</p>
          <p className="text-xs text-slate-400 mb-4 font-medium">Full-Stack Developer & Mentor</p>
          
          <div className="flex gap-2 text-sm">
            <a href="https://www.linkedin.com/in/eber-coronel-13536218b/" target="_blank" rel="noreferrer" 
               className="flex-1 py-2 bg-slate-800 hover:bg-[#0A66C2] hover:text-white transition-colors text-center rounded-xl text-slate-300 font-semibold ring-1 ring-white/5">
              LinkedIn
            </a>
            <a href="https://ebercoronel-dev.vercel.app" target="_blank" rel="noreferrer"
               className="flex-1 py-2 bg-slate-800 hover:bg-rose-500 hover:text-white transition-colors text-center rounded-xl text-slate-300 font-semibold ring-1 ring-white/5">
              Portfolio
            </a>
          </div>
          <a href="https://github.com/eber-cba/dataset-desigualdad-cordoba" target="_blank" rel="noreferrer"
             className="block mt-2 py-2 w-full bg-slate-900/80 hover:bg-slate-700 transition-colors text-center rounded-xl text-xs text-slate-300 font-bold tracking-widest uppercase ring-1 ring-white/5">
            Ver Repositorio
          </a>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
