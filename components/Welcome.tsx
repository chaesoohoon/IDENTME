import React from 'react';
import { Button } from './Button';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-10 animate-fade-in-up relative py-8 md:py-12">
      
      {/* Decorative Background Elements (Subtle) */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-violet-400 rounded-full blur-[80px] opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-pink-300 rounded-full blur-[80px] opacity-20"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 border border-white/50 text-violet-900 text-xs font-bold tracking-widest shadow-sm backdrop-blur-md uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
          </span>
          Personality & Career AI
        </div>
        
        {/* Balanced Title */}
        <div className="relative">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-600 tracking-tighter leading-none drop-shadow-lg mb-2">
            IDENT<br/>ME
            </h1>
            <div className="h-2 w-24 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mx-auto mt-4"></div>
        </div>

        <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed font-medium tracking-tight">
          16가지 질문으로 분석하는 당신의 <br className="hidden md:block" />
          <span className="text-violet-700 font-bold">생각의 지도</span>와 <span className="text-pink-600 font-bold">잠재된 가능성</span>
        </p>
      </div>

      {/* Refined Glass Stack */}
      <div className="relative w-full max-w-sm mx-auto h-28 mt-6 group cursor-default perspective-1000">
        <div className="absolute top-3 left-3 w-full h-full bg-white/30 rounded-2xl border border-white/40 backdrop-blur-sm transform rotate-2 transition-transform duration-500 group-hover:rotate-4 shadow-lg"></div>
        
        <div className="absolute inset-0 w-full h-full bg-white/70 rounded-2xl border border-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] flex items-center justify-between px-8 py-4 transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="text-center">
                <div className="text-2xl mb-1">🧠</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Logic</div>
            </div>
            <div className="w-px h-8 bg-gray-400/30"></div>
            <div className="text-center">
                <div className="text-2xl mb-1">❤️</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Empathy</div>
            </div>
            <div className="w-px h-8 bg-gray-400/30"></div>
            <div className="text-center">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Career</div>
            </div>
        </div>
      </div>

      <div className="pt-8 relative z-20">
        <Button onClick={onStart} className="text-lg px-12 py-5 shadow-xl shadow-violet-500/20 ring-1 ring-white/50">
          검사 시작하기
        </Button>
        <p className="mt-4 text-xs text-gray-500 font-medium tracking-wide">
          데이터 기반 정밀 분석 알고리즘 적용
        </p>
      </div>
    </div>
  );
};