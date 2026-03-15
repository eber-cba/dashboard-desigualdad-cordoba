import React from 'react';
import { Map, Activity, School, Bus, Lightbulb, Shield, Users, Building, AlertTriangle } from 'lucide-react';

const Sidebar = ({ activeVariable, setActiveVariable, variables }) => {
  return (
    <div className="w-80 h-full bg-slate-900 border-r border-slate-800 text-slate-300 p-6 flex flex-col justify-between overflow-y-auto">
      
      {/* HEADER & PORTFOLIO INFO */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-sky-500/10 rounded-lg">
            <Map className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">Desigualdad Urbana</h1>
        </div>

        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Dataset geolocalizado basado en 495 barrios de <strong className="text-slate-200">Córdoba Capital</strong>. Cruce de datos censales con la infraestructura de servicios públicos 2023.
        </p>

        {/* VARIABLE SELECTOR */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Variable a Visualizar
        </h2>
        
        <div className="flex flex-col gap-2">
          {variables.map((v) => {
            const Icon = v.icon;
            const isActive = activeVariable.key === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setActiveVariable(v)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out text-sm ${
                  isActive 
                    ? 'bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/50 shadow-sm shadow-sky-500/10' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="font-medium">{v.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FOOTER PROFILE */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Mentor / Ingeniero</h3>
        
        <div className="bg-slate-800/50 rounded-xl p-4 ring-1 ring-slate-700/50">
          <p className="text-slate-200 font-bold mb-1">Eber Coronel</p>
          <p className="text-xs text-slate-400 mb-4">Full-Stack Developer & Mentor Data Science</p>
          
          <div className="flex gap-2 text-sm">
            <a href="https://www.linkedin.com/in/eber-coronel-13536218b/" target="_blank" rel="noreferrer" 
               className="flex-1 py-1.5 bg-slate-700 hover:bg-sky-600 hover:text-white transition-colors text-center rounded text-slate-300 font-medium">
              LinkedIn
            </a>
            <a href="https://ebercoronel-dev.vercel.app" target="_blank" rel="noreferrer"
               className="flex-1 py-1.5 bg-slate-700 hover:bg-rose-500 hover:text-white transition-colors text-center rounded text-slate-300 font-medium">
              Portfolio
            </a>
          </div>
          <a href="https://github.com/eber-cba/dataset-desigualdad-cordoba" target="_blank" rel="noreferrer"
             className="block mt-2 py-1.5 w-full bg-slate-900 ring-1 ring-slate-700 hover:bg-slate-700 transition-colors text-center rounded text-xs text-slate-400 font-medium tracking-wide">
            Ver GitHub Repo
          </a>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
