import { Answer, AssessmentResults, WISCARScores, SectionScore } from '@/types/assessment';
import { getAllQuestions, assessmentSections } from '@/data/questions';

export const calculateAssessmentResults = (answers: Answer[]): AssessmentResults => {
  const questions = getAllQuestions();
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // Calculate section scores
  const sectionScores = calculateSectionScores(answers);
  
  // Calculate WISCAR scores
  const wiscarScores = calculateWISCARScores(answers);
  
  // Calculate overall scores
  const psychFitScore = calculatePsychFitScore(answers);
  const techScore = calculateTechScore(answers);
  const overallConfidence = calculateOverallConfidence(psychFitScore, techScore, wiscarScores);
  
  // Generate recommendation
  const recommendation = generateRecommendation(overallConfidence);
  const reasoning = generateReasoning(psychFitScore, techScore, wiscarScores, recommendation);
  
  // Generate guidance
  const nextSteps = generateNextSteps(recommendation, sectionScores);
  const skillGaps = identifySkillGaps(sectionScores);
  const careerRoles = generateCareerRoles(overallConfidence);
  const learningPath = generateLearningPath(skillGaps, techScore);

  return {
    psychFitScore,
    techScore,
    wiscarScores,
    overallConfidence,
    recommendation,
    reasoning,
    nextSteps,
    skillGaps,
    careerRoles,
    learningPath
  };
};

const calculateSectionScores = (answers: Answer[]): SectionScore[] => {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  
  return assessmentSections.map(section => {
    let totalScore = 0;
    let maxScore = 0;

    section.questions.forEach(question => {
      const answer = answerMap.get(question.id);
      if (answer !== undefined) {
        if (question.type === 'likert') {
          totalScore += (typeof answer === 'number' ? answer : 0) * question.weight;
          maxScore += (question.scale || 5) * question.weight;
        } else if (question.type === 'multiple-choice') {
          const isCorrect = answer === question.correctAnswer;
          totalScore += (isCorrect ? 1 : 0) * question.weight;
          maxScore += question.weight;
        }
      }
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    
    return {
      name: section.title,
      score: totalScore,
      maxScore,
      percentage,
      interpretation: getScoreInterpretation(percentage)
    };
  });
};

const calculateWISCARScores = (answers: Answer[]): WISCARScores => {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  
  // Will (motivation and grit)
  const will = calculateScoreFromQuestions(['psych_2', 'psych_5'], answerMap);
  
  // Interest (fascination and research orientation)
  const interest = calculateScoreFromQuestions(['psych_1', 'psych_7'], answerMap);
  
  // Skill (technical knowledge)
  const skill = calculateTechScore(answers);
  
  // Cognitive Readiness (logic and reasoning)
  const cognitiveReadiness = calculateScoreFromQuestions(['apt_1', 'apt_2', 'apt_3', 'apt_4', 'apt_5'], answerMap, true);
  
  // Ability to Learn (growth mindset)
  const abilityToLearn = calculateScoreFromQuestions(['psych_6'], answerMap);
  
  // Real-world Alignment (uncertainty tolerance)
  const realWorldAlignment = calculateScoreFromQuestions(['psych_8'], answerMap);

  return {
    will: Math.round(will),
    interest: Math.round(interest),
    skill: Math.round(skill),
    cognitiveReadiness: Math.round(cognitiveReadiness),
    abilityToLearn: Math.round(abilityToLearn),
    realWorldAlignment: Math.round(realWorldAlignment)
  };
};

const calculateScoreFromQuestions = (
  questionIds: string[], 
  answerMap: Map<string, number | string>,
  isCorrectness: boolean = false
): number => {
  const questions = getAllQuestions().filter(q => questionIds.includes(q.id));
  let totalScore = 0;
  let maxScore = 0;

  questions.forEach(question => {
    const answer = answerMap.get(question.id);
    if (answer !== undefined) {
      if (isCorrectness) {
        totalScore += answer === question.correctAnswer ? 1 : 0;
        maxScore += 1;
      } else {
        totalScore += typeof answer === 'number' ? answer : 0;
        maxScore += question.scale || 5;
      }
    }
  });

  return maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
};

const calculatePsychFitScore = (answers: Answer[]): number => {
  const psychQuestions = ['psych_1', 'psych_2', 'psych_3', 'psych_4', 'psych_5', 'psych_6', 'psych_7', 'psych_8'];
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  return Math.round(calculateScoreFromQuestions(psychQuestions, answerMap));
};

const calculateTechScore = (answers: Answer[]): number => {
  const techQuestions = getAllQuestions()
    .filter(q => q.category === 'aptitude' || q.category === 'prerequisites' || q.category === 'domain-specific')
    .map(q => q.id);
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  return Math.round(calculateScoreFromQuestions(techQuestions, answerMap, true));
};

const calculateOverallConfidence = (
  psychFitScore: number, 
  techScore: number, 
  wiscarScores: WISCARScores
): number => {
  const wiscarAverage = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
  return Math.round((psychFitScore * 0.3 + techScore * 0.4 + wiscarAverage * 0.3));
};

const generateRecommendation = (overallConfidence: number): 'Yes' | 'Maybe' | 'No' => {
  if (overallConfidence >= 70) return 'Yes';
  if (overallConfidence >= 50) return 'Maybe';
  return 'No';
};

const generateReasoning = (
  psychFitScore: number,
  techScore: number,
  wiscarScores: WISCARScores,
  recommendation: string
): string => {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (psychFitScore >= 70) strengths.push('strong psychological fit');
  else if (psychFitScore < 50) weaknesses.push('psychological misalignment');

  if (techScore >= 70) strengths.push('solid technical foundation');
  else if (techScore < 50) weaknesses.push('technical knowledge gaps');

  if (wiscarScores.will >= 80) strengths.push('high motivation and grit');
  if (wiscarScores.interest >= 80) strengths.push('genuine fascination with the field');

  const strengthText = strengths.length > 0 ? `Strengths: ${strengths.join(', ')}. ` : '';
  const weaknessText = weaknesses.length > 0 ? `Areas for development: ${weaknesses.join(', ')}. ` : '';

  return `${strengthText}${weaknessText}${getRecommendationExplanation(recommendation)}`;
};

const getRecommendationExplanation = (recommendation: string): string => {
  switch (recommendation) {
    case 'Yes':
      return 'Your profile shows strong alignment with quantum computing requirements.';
    case 'Maybe':
      return 'You have potential but should address key gaps before committing fully.';
    case 'No':
      return 'Consider building stronger foundations before pursuing this path.';
    default:
      return '';
  }
};

const generateNextSteps = (recommendation: string, sectionScores: SectionScore[]): string[] => {
  const steps: string[] = [];
  
  if (recommendation === 'Yes') {
    steps.push('Enroll in a quantum computing course or bootcamp');
    steps.push('Start learning Qiskit or Cirq framework');
    steps.push('Join quantum computing communities and forums');
  } else if (recommendation === 'Maybe') {
    const weakSections = sectionScores.filter(s => s.percentage < 60);
    weakSections.forEach(section => {
      if (section.name.includes('Foundation')) {
        steps.push('Strengthen mathematics and programming fundamentals');
      } else if (section.name.includes('Logic')) {
        steps.push('Practice logical reasoning and problem-solving');
      }
    });
    steps.push('Complete introductory quantum physics course');
  } else {
    steps.push('Build stronger foundation in mathematics and physics');
    steps.push('Develop programming skills in Python');
    steps.push('Explore related fields like classical AI/ML first');
  }

  return steps;
};

const identifySkillGaps = (sectionScores: SectionScore[]): string[] => {
  return sectionScores
    .filter(section => section.percentage < 70)
    .map(section => section.name);
};

const generateCareerRoles = (overallConfidence: number) => {
  const roles = [
    {
      title: 'Quantum Software Developer',
      description: 'Build quantum algorithms and applications using frameworks like Qiskit',
      match: Math.max(0, overallConfidence - 10)
    },
    {
      title: 'Quantum Research Scientist',
      description: 'Conduct research on quantum algorithms and theoretical aspects',
      match: Math.max(0, overallConfidence - 20)
    },
    {
      title: 'Quantum Machine Learning Engineer',
      description: 'Apply quantum computing to machine learning problems',
      match: Math.max(0, overallConfidence - 15)
    },
    {
      title: 'Quantum Systems Analyst',
      description: 'Analyze and optimize quantum computing systems and workflows',
      match: Math.max(0, overallConfidence - 5)
    }
  ];

  return roles.sort((a, b) => b.match - a.match);
};

const generateLearningPath = (skillGaps: string[], techScore: number) => {
  const path = [];

  if (techScore < 40) {
    path.push({
      phase: 'Foundation Building',
      topics: ['Linear Algebra', 'Complex Numbers', 'Python Programming', 'Probability Theory'],
      timeframe: '3-6 months'
    });
  }

  if (techScore < 70) {
    path.push({
      phase: 'Quantum Fundamentals',
      topics: ['Quantum Mechanics Basics', 'Qubits and Superposition', 'Quantum Gates', 'Quantum Circuits'],
      timeframe: '2-4 months'
    });
  }

  path.push({
    phase: 'Practical Development',
    topics: ['Qiskit Programming', 'Quantum Algorithms', 'Real Hardware Experiments', 'Quantum Error Correction'],
    timeframe: '4-8 months'
  });

  path.push({
    phase: 'Specialization',
    topics: ['Quantum ML', 'Quantum Cryptography', 'Industry Applications', 'Research Contributions'],
    timeframe: '6-12 months'
  });

  return path;
};

const getScoreInterpretation = (percentage: number): string => {
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 70) return 'Good';
  if (percentage >= 60) return 'Developing';
  if (percentage >= 50) return 'Basic';
  return 'Needs Improvement';
};