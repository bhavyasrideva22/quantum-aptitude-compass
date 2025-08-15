export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'technical';
  category: 'psychometric' | 'aptitude' | 'prerequisites' | 'domain-specific';
  section: string;
  question: string;
  options?: string[];
  scale?: number;
  correctAnswer?: string | number;
  weight: number;
}

export interface Answer {
  questionId: string;
  value: number | string;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  startTime: Date;
  timeSpent: { [sectionId: string]: number };
}

export interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  psychFitScore: number;
  techScore: number;
  wiscarScores: WISCARScores;
  overallConfidence: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  reasoning: string;
  nextSteps: string[];
  skillGaps: string[];
  careerRoles: Array<{
    title: string;
    description: string;
    match: number;
  }>;
  learningPath: Array<{
    phase: string;
    topics: string[];
    timeframe: string;
  }>;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  estimatedTime: number;
}