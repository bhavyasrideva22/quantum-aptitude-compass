import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults as Results } from '@/types/assessment';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, BookOpen, Target, Users } from 'lucide-react';

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes': return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'Maybe': return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'No': return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes': return 'text-green-500';
      case 'Maybe': return 'text-yellow-500';
      case 'No': return 'text-red-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="text-4xl">🎯</div>
            <h1 className="text-4xl font-bold bg-quantum bg-clip-text text-transparent">
              Your Quantum Career Assessment
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive analysis of your readiness for quantum computing
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="bg-gradient-card border-border/50 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              {getRecommendationIcon()}
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${getRecommendationColor()}`}>
                  {results.recommendation === 'Yes' && 'Highly Recommended'}
                  {results.recommendation === 'Maybe' && 'Proceed with Caution'}
                  {results.recommendation === 'No' && 'Not Recommended Yet'}
                </h2>
                <div className="text-2xl font-semibold text-muted-foreground mb-4">
                  Confidence Score: {results.overallConfidence}%
                </div>
                <Progress value={results.overallConfidence} variant="quantum" className="w-80 mx-auto h-3" />
              </div>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                {results.reasoning}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Psychological Fit */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🧠</span>
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(results.psychFitScore)}`}>
                  {results.psychFitScore}%
                </div>
                <Progress value={results.psychFitScore} variant="quantum" className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Personality, motivation, and cognitive alignment
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Score */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚡</span>
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(results.techScore)}`}>
                  {results.techScore}%
                </div>
                <Progress value={results.techScore} variant="quantum" className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Knowledge, aptitude, and technical skills
                </p>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Average */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span>
                WISCAR Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6))}`}>
                  {Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}%
                </div>
                <Progress value={Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)} variant="quantum" className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Multi-dimensional readiness framework
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Detailed Breakdown */}
        <Card className="bg-gradient-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              WISCAR Framework Analysis
            </CardTitle>
            <CardDescription>
              Will, Interest, Skill, Cognitive Readiness, Ability to Learn, Real-world Alignment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(results.wiscarScores).map(([key, score]) => (
                <div key={key} className="text-center">
                  <div className="capitalize font-medium mb-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  <Progress value={score} variant="quantum" className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps and Career Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Next Steps */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-6 h-6 rounded-full bg-quantum text-primary-foreground text-sm font-bold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Roles */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Best-Fit Career Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.careerRoles.slice(0, 4).map((role, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{role.title}</h4>
                      <Badge variant={role.match >= 70 ? 'default' : role.match >= 50 ? 'secondary' : 'outline'}>
                        {role.match}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        {results.learningPath.length > 0 && (
          <Card className="bg-gradient-card border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Personalized Learning Path
              </CardTitle>
              <CardDescription>
                Structured roadmap to bridge your skill gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {results.learningPath.map((phase, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <Badge variant="outline">{phase.timeframe}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {phase.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skill Gaps */}
        {results.skillGaps.length > 0 && (
          <Card className="bg-gradient-card border-border/50 mb-8">
            <CardHeader>
              <CardTitle>Areas for Development</CardTitle>
              <CardDescription>
                Focus areas to strengthen your quantum computing readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.skillGaps.map((gap, index) => (
                  <Badge key={index} variant="destructive" className="text-sm">
                    {gap}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="text-center">
          <Button onClick={onRestart} variant="quantum" size="lg">
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};