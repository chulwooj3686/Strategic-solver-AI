
import React, { useState } from 'react';
import { AppMode } from './types';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>(AppMode.GUIDE);

  const modes = [
    { id: AppMode.QA, label: '강의 Q&A', icon: '💡', color: '#60a5fa' }, // Blue
    { id: AppMode.GUIDE, label: '실무 가이드', icon: '🛠️', color: '#f472b6' }, // Pink
    { id: AppMode.DIAGNOSIS, label: '자가 진단', icon: '🔍', color: '#c084fc' }, // Purple
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-[#f3f4f6]">
      {/* Header */}
      <header className="bg-[#a855f7] neo-border neo-shadow p-8 mb-10 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <h1 className="text-4xl md:text-6xl font-black heading-font tracking-tighter text-black uppercase leading-none">
              STRATEGIC<br/>SOLVER AI
            </h1>
            <p className="font-black text-black mt-4 bg-white neo-border px-3 py-1 inline-block text-sm">
              GAM CONSULTING x LOGIC ENGINE
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{ backgroundColor: activeMode === mode.id ? 'white' : mode.color }}
                className={`px-5 py-3 neo-border font-black text-xs md:text-sm uppercase transition-all neo-shadow-hover ${
                  activeMode === mode.id ? 'translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000]' : 'neo-shadow-sm'
                }`}
              >
                {mode.icon} {mode.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Chat */}
        <div className="lg:col-span-8">
          <div className="mb-6 bg-[#fbbf24] neo-border p-5 neo-shadow-sm">
            <h2 className="text-black font-black heading-font text-xl uppercase mb-1">
              {modes.find(m => m.id === activeMode)?.label} ACTIVE
            </h2>
            <p className="text-black font-bold text-sm uppercase">
              {activeMode === AppMode.QA && "MASTER THE CORE CONCEPTS OF LOGICAL THINKING."}
              {activeMode === AppMode.GUIDE && "SHUT DOWN SYSTEM 1. ACTIVATE SYSTEM 2 PROTOCOL."}
              {activeMode === AppMode.DIAGNOSIS && "EXPOSE BIASES IN YOUR RECENT DECISIONS."}
            </p>
          </div>

          <ChatInterface mode={activeMode} />
        </div>

        {/* Right Side: Logic Cards */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white neo-border p-6 neo-shadow-sm">
            <h3 className="font-black heading-font text-lg mb-3 uppercase bg-[#22c55e] inline-block px-2 neo-border">MECE</h3>
            <p className="font-bold text-sm leading-tight uppercase">
              Mutually Exclusive, Collectively Exhaustive. No overlaps, no gaps. Map out the problem space completely.
            </p>
          </div>
          
          <div className="bg-white neo-border p-6 neo-shadow-sm">
            <h3 className="font-black heading-font text-lg mb-3 uppercase bg-[#f472b6] inline-block px-2 neo-border">5 WHY</h3>
            <p className="font-bold text-sm leading-tight uppercase">
              Go deeper. Surface reasons are illusions. Ask 'Why' 5 times to reach the root cause.
            </p>
          </div>

          <div className="bg-white neo-border p-6 neo-shadow-sm">
            <h3 className="font-black heading-font text-lg mb-3 uppercase bg-[#fbbf24] inline-block px-2 neo-border">SYSTEM 2</h3>
            <p className="font-bold text-sm leading-tight uppercase">
              Fast thinking is often wrong. Slow down, calculate, and analyze. Logic is the ultimate tool.
            </p>
          </div>

          <div className="p-4 neo-border bg-black text-white font-black text-center neo-shadow-sm rotate-1">
            GAM CONSULTING<br/>PROTOCOL V2.6
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 mb-8 text-center">
        <div className="inline-block bg-white neo-border p-4 neo-shadow-sm font-black text-xs uppercase tracking-widest">
          © 2026 GAM CONSULTING. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default App;
