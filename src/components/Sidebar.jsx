import React from 'react';
import { Map, Zap, School, Bus, Lightbulb, Shield, Users, Building, AlertTriangle, Activity } from 'lucide-react';

const Sidebar = ({ activeVariable, setActiveVariable, variables }) => {
  return (
    <div className="w-full h-auto max-h-[45vh] md:max-h-full md:h-full bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)] rounded-3xl text-slate-200 p-5 md:p-6 flex flex-col pointer-events-auto overflow-y-auto custom-scrollbar">
      
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

        <p className="text-xs text-slate-400 mb-5 leading-relaxed hidden md:block">
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

        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
          <Zap className="w-3 h-3 text-amber-400" />
          Métricas Geoespaciales
        </h2>
        
        {/* VARIABLE SELECTOR */}
        <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0 custom-scrollbar">
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
      <div className="mt-auto hidden xl:block pt-5 border-t border-slate-700/50">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Ingeniería & Datos</h3>
        <div className="bg-slate-950/40 rounded-2xl p-4 ring-1 ring-white/10 hover:ring-sky-500/30 transition-all duration-300 group">
          <p className="text-white font-bold tracking-wide group-hover:text-sky-400 transition-colors">Eber Coronel</p>
          <p className="text-[11px] text-slate-400 mb-3 font-medium">Principal Urban Data Scientist</p>
          <a href="https://github.com/eber-cba/dataset-desigualdad-cordoba" target="_blank" rel="noreferrer"
             className="block py-2 w-full bg-slate-900/80 hover:bg-slate-700 transition-colors text-center rounded-xl text-[11px] text-slate-300 font-bold tracking-widest uppercase ring-1 ring-white/5 hover:text-white">
            Ver Entorno V19 (Git)
          </a>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
