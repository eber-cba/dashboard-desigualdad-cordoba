import React from 'react';
import { Map, Zap, School, Bus, Lightbulb, Shield, Users, Building, AlertTriangle, Activity } from 'lucide-react';

const Sidebar = ({ activeVariable, setActiveVariable, variables }) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div 
      className={`
        w-full md:w-full h-auto max-h-[70vh] md:max-h-full md:h-full 
        bg-slate-900/95 backdrop-blur-3xl border-t md:border border-slate-700/50 
        shadow-[0_-10px_40px_-10px_rgba(14,165,233,0.2)] md:shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)] 
        rounded-t-[32px] md:rounded-[32px] text-slate-200 
        px-4 pb-6 pt-2 md:p-6 flex flex-col pointer-events-auto 
        transition-all duration-500 ease-in-out
        ${isMobileOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)] md:translate-y-0'}
      `}
    >
      {/* MOBILE HANDLE */}
      <div 
        className="flex md:hidden flex-col items-center gap-1.5 pb-3 pt-1 cursor-pointer"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
        <p className="text-[10px] font-bold text-sky-400/80 uppercase tracking-[0.2em]">
          {isMobileOpen ? 'Cerrar Menú' : 'Explorar Métricas'}
        </p>
      </div>

      <div className={`flex flex-col h-full overflow-hidden ${!isMobileOpen && 'md:opacity-100 opacity-0'} transition-opacity duration-300`}>
      
      {/* HEADER */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <div className="p-2.5 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl ring-1 ring-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            <Map className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400 tracking-tight drop-shadow-md">
              Desigualdad Urbana
            </h1>
            <p className="text-xs text-sky-400/80 font-bold tracking-widest uppercase">Córdoba Capital</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed hidden md:block">
          Plataforma de <strong>Urban Data Science V19</strong>. Selecciona una métrica territorial para visualizar su huella geoespacial en la ciudad.
        </p>

        {/* Dynamic Description Box (Neon Card) */}
        <div className="mb-5 p-4 bg-slate-950/60 rounded-2xl border border-sky-500/20 shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 shadow-[0_0_10px_#0ea5e9]"></div>
          <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2 mb-1">
            <activeVariable.icon className="w-4 h-4" />
            {activeVariable.label}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeVariable.desc}
          </p>
        </div>

        <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Métricas Geoespaciales
        </h2>
        
        {/* VARIABLE SELECTOR */}
        <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-y-auto pb-4 xl:pb-0 custom-scrollbar max-h-[30vh] md:max-h-[45vh]">
          {variables.map((v) => {
            const Icon = v.icon;
            const isActive = activeVariable.key === v.key;
            
            // Asignación de clases del tour basándonos en la key de la variable
            let tourClass = '';
            if (v.key === 'pct_nbi') tourClass = 'tour-step-3-vulnerability';
            else if (v.key === 'escuelas_por_1000_hab') tourClass = 'tour-step-4-schools';

            return (
              <button
                key={v.key}
                onClick={() => setActiveVariable(v)}
                className={`flex text-left items-center gap-3 px-4 py-2.5 min-w-max xl:min-w-0 rounded-2xl transition-all duration-300 ease-out text-sm ${tourClass} ${
                  isActive 
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/10 text-sky-300 ring-1 ring-sky-400/50 shadow-[0_0_20px_-5px_rgba(14,165,233,0.4)] scale-[1.02]' 
                    : 'bg-slate-800/40 hover:bg-slate-700/50 text-slate-400 hover:text-slate-100 ring-1 ring-white/5 hover:ring-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isActive ? 'text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'text-slate-500'}`} />
                <span className="font-medium tracking-wide leading-tight">{v.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FOOTER PROFILE - Responsive */}
      <div className="mt-auto hidden xl:block pt-5 border-t border-slate-700/50 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">Ingeniería & Datos</h3>
        <div className="bg-slate-950/60 rounded-2xl p-4 ring-1 ring-sky-500/20 hover:ring-sky-500/50 transition-all duration-300 group">
          <p className="text-sky-300 font-extrabold tracking-wide text-lg group-hover:text-sky-400 transition-colors">Eber Coronel</p>
          <p className="text-xs text-slate-300 mb-3 font-medium">Principal Urban Data Scientist</p>
          
          <div className="flex gap-2 justify-center mb-3">
            <a href="https://linkedin.com/in/ebercoronel" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
              <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded">LinkedIn</span>
            </a>
            <a href="https://github.com/eber-cba" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded">GitHub</span>
            </a>
          </div>

          <a href="https://github.com/eber-cba/dataset-desigualdad-cordoba" target="_blank" rel="noreferrer"
             className="block py-2 w-full bg-slate-900 shadow-md hover:bg-sky-600 transition-colors text-center rounded-xl text-xs text-white font-bold tracking-widest uppercase ring-1 ring-white/10 hover:ring-sky-400">
            Ver Repo V19
          </a>
        </div>
        <p className="text-[10px] text-slate-500 mt-3 font-medium tracking-wide">
          © {new Date().getFullYear()} Creado por Eber Coronel.<br/>All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
