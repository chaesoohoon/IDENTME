import React, { useEffect, useState } from 'react';
import { UserScore, PersonalityResult, TemperamentResult, CareerResult, Temperament } from '../types';
import { TRAIT_DESCRIPTIONS, TEMPERAMENT_DESCRIPTIONS, CAREER_GUIDE } from '../constants';
import { generateGeminiAdvice } from '../services/geminiService';
import { Button } from './Button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ResultProps {
  score: UserScore;
  onRestart: () => void;
}

export const Result: React.FC<ResultProps> = ({ score, onRestart }) => {
  const [personality, setPersonality] = useState<PersonalityResult | null>(null);
  const [temperament, setTemperament] = useState<TemperamentResult | null>(null);
  const [career, setCareer] = useState<CareerResult | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Percentages for visualization
  const [traitPercent, setTraitPercent] = useState({ t: 0, f: 0, a: 0, c: 0 });

  useEffect(() => {
    // 1. Calculate Traits
    const totalTF = score.T + score.F;
    const totalAC = score.A + score.C;
    
    // Prevent division by zero
    const tPct = totalTF === 0 ? 50 : Math.round((score.T / totalTF) * 100);
    const fPct = 100 - tPct;
    const aPct = totalAC === 0 ? 50 : Math.round((score.A / totalAC) * 100);
    const cPct = 100 - aPct;
    
    setTraitPercent({ t: tPct, f: fPct, a: aPct, c: cPct });

    const code1 = score.T >= score.F ? 'T' : 'F';
    const code2 = score.A >= score.C ? 'A' : 'C';
    const pCode = `${code1}${code2}`;
    const pResult = TRAIT_DESCRIPTIONS[pCode];

    // 2. Calculate Temperament (Weighted with explicit temperament scores)
    const temps: Temperament[] = ['Analyst', 'Maker', 'Helper', 'Explorer'];
    // Sort by score descending
    const sortedTemps = temps.sort((a, b) => score[b] - score[a]);
    const topTemp = sortedTemps[0];
    const tResult = TEMPERAMENT_DESCRIPTIONS[topTemp];

    // 3. Determine Career
    let careerKey = '';
    if (topTemp === 'Analyst') {
        careerKey = (score.T > score.F) ? 'Analyst_IT' : 'Analyst_Research';
    } else if (topTemp === 'Maker') {
        careerKey = (score.A > score.C) ? 'Maker_Tech' : 'Maker_Creative';
    } else if (topTemp === 'Helper') {
        careerKey = (score.C > score.A) ? 'Helper_Social' : 'Helper_Medical';
    } else { 
        careerKey = (score.A > score.T) ? 'Explorer_Biz' : 'Explorer_Content';
    }
    
    const cResult = CAREER_GUIDE[careerKey] || CAREER_GUIDE['Analyst_IT'];

    setPersonality(pResult);
    setTemperament(tResult);
    setCareer(cResult);

    const fetchAdvice = async () => {
      setLoadingAi(true);
      const advice = await generateGeminiAdvice(pResult, tResult);
      setAiAdvice(advice);
      setLoadingAi(false);
    };
    fetchAdvice();

  }, [score]);

  const handleShare = async () => {
    // Data to be shared
    const shareData = {
      title: 'IDENT ME - 성향 분석 결과',
      text: `나의 성향은 [${personality?.title}]입니다.\n당신의 잠재력도 확인해보세요! 👇`,
      url: window.location.href, // This shares the current URL
    };

    // Use Web Share API if available (Mobile Native Share)
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return;
        } catch (err) {
            console.log("Share skipped, falling back to clipboard");
        }
    }

    // Fallback: Copy to clipboard
    try {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000); // 3초 동안 유지
    } catch (err) {
        alert("링크 복사에 실패했습니다. 브라우저 주소창을 복사해주세요.");
    }
  };

  if (!personality || !temperament || !career) return <div className="text-center mt-32 text-gray-500 animate-pulse font-medium">데이터 분석 중...</div>;

  const maxScore = Math.max(score.Analyst, score.Maker, score.Helper, score.Explorer) || 10;
  
  const chartData = [
    { subject: 'Analyst', A: score.Analyst, fullMark: maxScore },
    { subject: 'Maker', A: score.Maker, fullMark: maxScore },
    { subject: 'Helper', A: score.Helper, fullMark: maxScore },
    { subject: 'Explorer', A: score.Explorer, fullMark: maxScore },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in-up pb-24">
      
      {/* Identity Card - Hero Section */}
      <div className="glass-card-deep rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden transition-all hover:shadow-2xl hover:bg-white/70">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400"></div>
            
            <p className="text-gray-400 font-bold tracking-[0.3em] text-[10px] mb-8 uppercase">Analysis Complete</p>
            
            <div className="mb-6 relative inline-flex items-center justify-center">
                <h1 className="text-7xl md:text-9xl font-black text-gray-800 tracking-tighter drop-shadow-md z-10 font-heading">
                {personality.code}
                </h1>
                <div className="absolute -right-6 -top-4 rotate-[15deg] bg-white border border-gray-100 shadow-xl px-4 py-2 rounded-xl z-20">
                     <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                        {temperament.code}
                     </span>
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{personality.title}</h2>
            <p className="text-gray-600 leading-7 text-base md:text-lg max-w-xl mx-auto word-keep font-medium">
                {personality.description}
            </p>
      </div>

      {/* Analytics Section: Bars & Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trait Breakdown (Bar Charts) */}
          <div className="glass-card-deep rounded-[2rem] p-8 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Trait Balance</h3>
            
            <div className="space-y-6">
                {/* Logic vs Emotion */}
                <div>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                        <span>Logic (T)</span>
                        <span>Emotion (F)</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                        <div className="bg-gray-800 h-full" style={{ width: `${traitPercent.t}%` }}></div>
                        <div className="bg-gray-300 h-full" style={{ width: `${traitPercent.f}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                        <span>{traitPercent.t}%</span>
                        <span>{traitPercent.f}%</span>
                    </div>
                </div>

                {/* Action vs Connect */}
                <div>
                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                        <span>Action (A)</span>
                        <span>Connect (C)</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                        <div className="bg-violet-600 h-full" style={{ width: `${traitPercent.a}%` }}></div>
                        <div className="bg-pink-300 h-full" style={{ width: `${traitPercent.c}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                        <span>{traitPercent.a}%</span>
                        <span>{traitPercent.c}%</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Temperament Radar */}
          <div className="glass-card-deep rounded-[2rem] p-6 flex flex-col items-center justify-center relative min-h-[300px]">
            <h3 className="absolute top-6 left-8 text-sm font-bold text-gray-400 uppercase tracking-wider">Temperament</h3>
            <div className="w-full h-[240px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
                    <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#4b5563"
                        strokeWidth={2}
                        fill="#1f2937"
                        fillOpacity={0.2}
                    />
                </RadarChart>
                </ResponsiveContainer>
            </div>
          </div>
      </div>

       {/* Career Section - Clean & Professional */}
       <div className="glass-card-deep rounded-[2rem] p-8 md:p-12 border-l-8 border-l-violet-600">
            <h3 className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-4">Recommended Career Path</h3>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{career.category}</h2>
            </div>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed font-medium">
                {career.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
                {career.jobs.map((job, i) => (
                    <span key={i} className="px-4 py-2 bg-white rounded-lg text-sm font-bold text-gray-700 border border-gray-200 shadow-sm">
                        {job}
                    </span>
                ))}
            </div>
       </div>

       {/* AI Advice Section */}
       <div className="bg-gradient-to-br from-violet-50 to-white rounded-[2rem] p-8 md:p-10 border border-violet-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-violet-100/50 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-violet-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span> AI Insight
                </h3>
                <div className="min-h-[80px]">
                        {loadingAi ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-2 bg-violet-200/50 rounded w-full"></div>
                            <div className="h-2 bg-violet-200/50 rounded w-5/6"></div>
                            <div className="h-2 bg-violet-200/50 rounded w-4/6"></div>
                        </div>
                    ) : (
                        <p className="text-gray-700 leading-8 text-[15px] font-medium">
                            {aiAdvice}
                        </p>
                    )}
                </div>
            </div>
       </div>

       {/* Action Buttons: Restart & Share */}
       <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Button onClick={onRestart} variant="secondary" className="px-10 py-4 text-base shadow-sm hover:shadow-md bg-white border border-gray-200">
                🔄 테스트 다시하기
            </Button>
            <Button onClick={handleShare} variant="primary" className="px-10 py-4 text-base shadow-lg shadow-violet-200">
                {isCopied ? '✅ 링크 복사 완료!' : '🔗 결과 공유하기'}
            </Button>
       </div>

       {/* Sponsored Banner */}
       <a 
         href="http://cd.kjca.co.kr/"
         target="_blank"
         rel="noopener noreferrer"
         className="mt-8 block relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-slate-800 text-white p-6 shadow-xl cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
       >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div>
                    <p className="text-xs font-bold text-violet-300 uppercase tracking-widest mb-1">Premium Coding Education</p>
                    <p className="text-lg md:text-xl font-bold">
                        바이브코딩은 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">더국제</span>
                    </p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                    <span className="text-xl md:text-2xl font-black text-yellow-400 tracking-wider">062-971-1114</span>
                </div>
            </div>
       </a>

    </div>
  );
};