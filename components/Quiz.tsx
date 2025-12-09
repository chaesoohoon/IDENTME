import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { AnswerOption, UserScore } from '../types';

interface QuizProps {
  onComplete: (score: UserScore) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<UserScore>({
    T: 0, F: 0, A: 0, C: 0,
    Analyst: 0, Maker: 0, Helper: 0, Explorer: 0
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (option: AnswerOption, idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;
    
    // Force focus removal to prevent sticky focus styles on mobile
    e.currentTarget.blur();
    
    setSelectedOptionIndex(idx);
    setIsTransitioning(true);

    const newScore = { ...score };
    if (option.score.T) newScore.T += option.score.T;
    if (option.score.F) newScore.F += option.score.F;
    if (option.score.A) newScore.A += option.score.A;
    if (option.score.C) newScore.C += option.score.C;
    if (option.score.Analyst) newScore.Analyst += option.score.Analyst;
    if (option.score.Maker) newScore.Maker += option.score.Maker;
    if (option.score.Helper) newScore.Helper += option.score.Helper;
    if (option.score.Explorer) newScore.Explorer += option.score.Explorer;

    setScore(newScore);

    // Transition speed
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptionIndex(null); // Reset selection
        setIsTransitioning(false);
      } else {
        onComplete(newScore);
      }
    }, 300); 
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0">
      {/* CSS for strict hover control on touch devices */}
      <style>{`
        @media (hover: hover) {
          .btn-interactive:hover {
            background-color: white !important;
            border-color: #ddd6fe !important; /* violet-200 */
            color: #111827 !important; /* gray-900 */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
            transform: translateY(-2px);
          }
        }
      `}</style>

      {/* Progress & Header */}
      <div className="mb-8 md:mb-12 flex flex-col items-center w-full">
        <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3 tracking-widest uppercase">
            <span>Question {String(currentQuestionIndex + 1).padStart(2, '0')}</span>
            <span>{QUESTIONS.length}</span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-800 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 3D Card Container */}
      <div className="perspective-1000 min-h-[400px]">
        <div 
            className={`glass-card-deep rounded-[2rem] p-6 md:p-12 h-full flex flex-col justify-between transition-all duration-300 transform-style-3d ${
            isTransitioning ? 'opacity-0 rotate-x-6 scale-95 translate-y-4' : 'opacity-100 rotate-x-0 scale-100 translate-y-0'
            }`}
        >
            <div className="flex-grow flex flex-col justify-center mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 leading-snug text-center break-keep drop-shadow-sm font-heading select-none">
                {currentQuestion.question}
                </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
            {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isOtherSelected = selectedOptionIndex !== null && !isSelected;

                return (
                    <button
                        // Unique key forces React to completely replace the button element, ensuring no sticky states
                        key={`q${currentQuestion.id}-opt${idx}`}
                        onClick={(e) => handleAnswer(option, idx, e)}
                        disabled={isTransitioning}
                        className={`
                            w-full p-5 md:p-6 text-left relative overflow-hidden rounded-xl transition-all duration-200 outline-none
                            group active:scale-[0.98]
                            ${isSelected 
                                ? 'bg-violet-600 border-violet-600 text-white shadow-md ring-2 ring-violet-300 ring-offset-2 z-10' 
                                : 'bg-white/50 border border-white/60 text-gray-700 active:bg-violet-50 btn-interactive'}
                            ${isOtherSelected ? 'opacity-40 blur-[1px]' : 'opacity-100'}
                        `}
                    >
                        <div className="flex items-center relative z-10">
                            <span className={`
                                flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold mr-4 transition-colors duration-200
                                ${isSelected 
                                    ? 'bg-white text-violet-600 border-white' 
                                    : 'border-gray-200 text-gray-400 group-active:border-violet-300 group-active:text-violet-600'}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="font-medium text-base md:text-lg leading-snug transition-colors">
                                {option.text}
                            </span>
                        </div>
                    </button>
                );
            })}
            </div>
        </div>
      </div>
      
      <div className="text-center mt-8 text-gray-400 text-xs font-medium tracking-wide opacity-60">
        직관적으로 솔직하게 답변해주세요
      </div>
    </div>
  );
};