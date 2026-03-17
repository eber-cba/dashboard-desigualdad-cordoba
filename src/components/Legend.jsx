import React from 'react';
import { Info, Maximize2, Minimize2 } from 'lucide-react';

const Legend = ({ activeVariable, onCloseMobile }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)] rounded-2xl p-4 text-slate-200 pointer-events-auto flex flex-col gap-3 group">
      
      {/* HEADER LEYENDA */}
      <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300">Guía de Visualización</h3>
        </div>
        {/* Botón cerrar para mobile dentro del componente */}
        <button onClick={onCloseMobile} className="md:hidden p-1 text-slate-500 hover:text-white">
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* RANGO DE COLORES */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>Menor Intensidad</span>
          <span>Mayor Intensidad</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#0ea5e9] via-[#2563eb] via-[#9333ea] via-[#c026d3] to-[#e11d48] shadow-[0_0_10px_rgba(14,165,233,0.2)]"></div>
        <p className="text-[11px] text-slate-400 leading-tight">
          Los colores indican el nivel de <strong className="text-sky-300">{activeVariable.label}</strong> en cada barrio.
        </p>
      </div>

      {/* TAMAÑO DE CÍRCULOS */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-500 border border-slate-400 shadow-[0_0_5px_rgba(148,163,184,0.3)]"></div>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Bajo</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-2"></div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-sky-500/30 border-2 border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.4)]"></div>
            <span className="text-[9px] text-sky-400 font-bold uppercase tracking-tighter">Alto</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          El <strong>tamaño del círculo</strong> representa proporcionalmente el valor absoluto de la métrica.
        </p>
      </div>

    </div>
  );
};

export default Legend;
