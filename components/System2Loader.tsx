
import React from 'react';

const System2Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 neo-border bg-white neo-shadow-sm w-max mx-auto my-4">
      <div className="flex space-x-3">
        <div className="w-4 h-4 neo-border animate-system2-dot" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 neo-border animate-system2-dot" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 neo-border animate-system2-dot" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="text-black text-sm font-black tracking-tighter uppercase heading-font">
        SYSTEM 2 ENGAGED
      </p>
    </div>
  );
};

export default System2Loader;
