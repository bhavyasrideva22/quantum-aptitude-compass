import { useState, useEffect } from 'react';
import { AssessmentIntro } from './AssessmentIntro';
import { AssessmentQuestion } from './AssessmentQuestion';
import { AssessmentResults } from './AssessmentResults';
import { AssessmentState, Answer, AssessmentResults as Results } from '@/types/assessment';
import { assessmentSections, getAllQuestions } from '@/data/questions';
import { calculateAssessmentResults } from '@/utils/scoring';

type AssessmentPhase = 'intro' | 'assessment' | 'results';

export const AssessmentContainer = () => {
  const [phase, setPhase] = useState<AssessmentPhase>('intro');
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    startTime: new Date(),
    timeSpent: {}
  });
  const [results, setResults] = useState<Results | null>(null);

  const allQuestions = getAllQuestions();
  const currentSection = assessmentSections[assessmentState.currentSection];
  const currentQuestion = allQuestions[assessmentState.currentQuestion];
  
  const handleStartAssessment = () => {
    setPhase('assessment');
    setAssessmentState(prev => ({
      ...prev,
      startTime: new Date()
    }));
  };

  const handleAnswer = (answer: Answer) => {
    setAssessmentState(prev => {
      const existingIndex = prev.answers.findIndex(a => a.questionId === answer.questionId);
      const newAnswers = [...prev.answers];
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = answer;
      } else {
        newAnswers.push(answer);
      }
      
      return {
        ...prev,
        answers: newAnswers
      };
    });
  };

  const handleNext = () => {
    if (assessmentState.currentQuestion < allQuestions.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
      
      // Check if we've moved to a new section
      const nextQuestionSectionIndex = findSectionIndex(assessmentState.currentQuestion + 1);
      if (nextQuestionSectionIndex !== assessmentState.currentSection) {
        setAssessmentState(prev => ({
          ...prev,
          currentSection: nextQuestionSectionIndex
        }));
      }
    } else {
      // Assessment complete
      finishAssessment();
    }
  };

  const handlePrevious = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
      
      // Check if we've moved to a previous section
      const prevQuestionSectionIndex = findSectionIndex(assessmentState.currentQuestion - 1);
      if (prevQuestionSectionIndex !== assessmentState.currentSection) {
        setAssessmentState(prev => ({
          ...prev,
          currentSection: prevQuestionSectionIndex
        }));
      }
    }
  };

  const findSectionIndex = (questionIndex: number): number => {
    let questionCount = 0;
    for (let i = 0; i < assessmentSections.length; i++) {
      questionCount += assessmentSections[i].questions.length;
      if (questionIndex < questionCount) {
        return i;
      }
    }
    return assessmentSections.length - 1;
  };

  const finishAssessment = () => {
    const assessmentResults = calculateAssessmentResults(assessmentState.answers);
    setResults(assessmentResults);
    setPhase('results');
  };

  const handleRestart = () => {
    setPhase('intro');
    setAssessmentState({
      currentSection: 0,
      currentQuestion: 0,
      answers: [],
      startTime: new Date(),
      timeSpent: {}
    });
    setResults(null);
  };

  const getCurrentAnswer = () => {
    return assessmentState.answers.find(a => a.questionId === currentQuestion?.id);
  };

  if (phase === 'intro') {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  if (phase === 'results' && results) {
    return <AssessmentResults results={results} onRestart={handleRestart} />;
  }

  if (phase === 'assessment' && currentQuestion && currentSection) {
    return (
      <AssessmentQuestion
        question={currentQuestion}
        currentQuestionIndex={assessmentState.currentQuestion}
        totalQuestions={allQuestions.length}
        sectionTitle={currentSection.title}
        sectionIcon={currentSection.icon}
        answer={getCurrentAnswer()}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={assessmentState.currentQuestion < allQuestions.length - 1 || true}
        canGoPrevious={assessmentState.currentQuestion > 0}
      />
    );
  }

  return null;
};