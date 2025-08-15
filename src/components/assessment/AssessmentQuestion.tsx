import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question, Answer } from '@/types/assessment';

interface AssessmentQuestionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  sectionTitle: string;
  sectionIcon: string;
  answer?: Answer;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const AssessmentQuestion = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  sectionTitle,
  sectionIcon,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}: AssessmentQuestionProps) => {
  const [currentAnswer, setCurrentAnswer] = useState<number | string | undefined>(
    answer?.value
  );

  const handleAnswer = (value: number | string) => {
    setCurrentAnswer(value);
    onAnswer({ questionId: question.id, value });
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const renderLikertScale = () => {
    const scale = question.scale || 5;
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: scale }, (_, i) => i + 1).map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                currentAnswer === value
                  ? 'border-primary bg-quantum text-primary-foreground shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="font-semibold">{value}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{labels[0]}</span>
          <span>{labels[4]}</span>
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
            currentAnswer === option
              ? 'border-primary bg-quantum text-primary-foreground shadow-md'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              currentAnswer === option ? 'border-primary-foreground bg-primary-foreground' : 'border-muted-foreground'
            }`}>
              {currentAnswer === option && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <span>{option}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{sectionIcon}</span>
              <Badge variant="secondary">{sectionTitle}</Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progressPercentage} variant="quantum" className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-card border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
            {question.section && (
              <Badge variant="outline" className="w-fit">
                {question.section}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {question.type === 'likert' ? renderLikertScale() : renderMultipleChoice()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="quantumOutline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext || currentAnswer === undefined}
            variant="quantum"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};