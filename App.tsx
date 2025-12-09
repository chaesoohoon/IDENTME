import React, { useState } from 'react';
import { Welcome } from './components/Welcome';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { UserScore } from './types';

enum Step {
  WELCOME,
  QUIZ,
  RESULT,
}

function App() {
  const [step, setStep] = useState<Step>(Step.WELCOME);
  const [finalScore, setFinalScore] = useState<UserScore | null>(null);

  const startQuiz = () => setStep(Step.QUIZ);

  const completeQuiz = (score: UserScore) => {
    setFinalScore(score);
    setStep(Step.RESULT);
  };

  const restart = () => {
    setFinalScore(null);
    setStep(Step.WELCOME);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-gray-800 selection:bg-violet-200 selection:text-violet-900">
      {/* Background Layer 1: Gradient */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-[#f8f9fa] via-[#ece9f1] to-[#e3e8ed] -z-40"></div>
      
      {/* Background Layer 2: Animated Blobs (Slower, softer) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-30 pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-violet-200 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-20%] w-[70vw] h-[70vw] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-sky-100 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Background Layer 3: Noise Texture for "Paper" feel */}
      <div className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.04] z-[-20]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div 
            className="pointer-events-auto px-5 py-2 bg-white/40 backdrop-blur-xl rounded-full border border-white/50 shadow-sm cursor-pointer transition-all hover:bg-white/60 hover:scale-105 active:scale-95 group" 
            onClick={restart}
        >
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-800 uppercase group-hover:text-violet-700 transition-colors">Ident Me</span>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-12 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-4xl transition-all duration-700 ease-out">
          {step === Step.WELCOME && <Welcome onStart={startQuiz} />}
          {step === Step.QUIZ && <Quiz onComplete={completeQuiz} />}
          {step === Step.RESULT && finalScore && (
            <Result score={finalScore} onRestart={restart} />
          )}
        </div>
      </main>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* Mobile Highlight Removal */
            -webkit-tap-highlight-color: transparent;
        }

        /* Ensure buttons don't have tap highlight */
        button, a {
            -webkit-tap-highlight-color: transparent;
        }
        
        h1, h2, h3, h4 {
            font-family: 'Outfit', sans-serif;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 { animation-delay: 7s; }
        .animation-delay-4000 { animation-delay: 14s; }
        
        /* Premium Glassmorphism */
        .glass-card-deep {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 
            0 20px 40px -10px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        }

        .perspective-1000 {
            perspective: 1000px;
        }
        
        .transform-style-3d {
            transform-style: preserve-3d;
        }

        /* Scrollbar hide */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default App;