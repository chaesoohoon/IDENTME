export type Trait = 'T' | 'F' | 'A' | 'C';
export type Temperament = 'Analyst' | 'Maker' | 'Helper' | 'Explorer';

export interface AnswerOption {
  text: string;
  score: {
    [key in Trait]?: number;
  } & {
    [key in Temperament]?: number;
  };
}

export interface Question {
  id: number;
  question: string;
  options: AnswerOption[];
}

export interface UserScore {
  T: number;
  F: number;
  A: number;
  C: number;
  Analyst: number;
  Maker: number;
  Helper: number;
  Explorer: number;
}

export interface PersonalityResult {
  code: string; // e.g., "TA"
  title: string;
  description: string;
}

export interface TemperamentResult {
  code: Temperament;
  description: string;
  details: string[];
}

export interface CareerResult {
  category: string;
  description: string;
  jobs: string[];
}
