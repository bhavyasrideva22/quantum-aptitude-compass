import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, TrendingUp, Zap } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-quantum-subtle opacity-20 quantum-float"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-gradient-glow opacity-10 quantum-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full bg-quantum-subtle opacity-15 quantum-float"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="text-4xl">⚛️</div>
            <h1 className="text-4xl font-bold bg-quantum bg-clip-text text-transparent">
              Quantum Pathfinder
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Should I Become a Quantum Computing Developer?
          </p>
          <p className="text-muted-foreground mt-2">
            AI-powered assessment to evaluate your readiness for a quantum computing career
          </p>
        </div>

        {/* What is Quantum Computing Development */}
        <Card className="bg-gradient-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              What Is Quantum Computing Development?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Quantum Computing Developers build software that runs on quantum computers, leveraging qubits, 
              quantum gates, superposition, and entanglement. They work on problems like cryptography, 
              optimization, and simulations that are unsolvable by classical computers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                "Quantum Algorithm Developer",
                "Quantum Software Engineer", 
                "Quantum Research Scientist",
                "Quantum AI/ML Specialist"
              ].map((role, index) => (
                <Badge key={index} variant="secondary" className="justify-center py-2">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>🧠 Assessment Components</CardTitle>
              <CardDescription>Comprehensive evaluation across multiple dimensions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: "🧠", title: "Psychometric Analysis", desc: "Personality, motivation, and cognitive fit" },
                { icon: "🧮", title: "Logic & Reasoning", desc: "Analytical and problem-solving abilities" },
                { icon: "📚", title: "Foundation Knowledge", desc: "Math, physics, and programming prerequisites" },
                { icon: "⚛️", title: "Quantum Understanding", desc: "Domain-specific concepts and applications" }
              ].map((component, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="text-2xl">{component.icon}</span>
                  <div>
                    <h4 className="font-medium">{component.title}</h4>
                    <p className="text-sm text-muted-foreground">{component.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>📊 What You'll Get</CardTitle>
              <CardDescription>Personalized insights and career guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: <TrendingUp className="h-5 w-5" />, title: "Readiness Score", desc: "Overall fit assessment with detailed breakdown" },
                { icon: <Users className="h-5 w-5" />, title: "Career Matching", desc: "Best-fit quantum computing roles for your profile" },
                { icon: <Clock className="h-5 w-5" />, title: "Learning Path", desc: "Personalized roadmap to bridge skill gaps" },
                { icon: <Zap className="h-5 w-5" />, title: "Next Steps", desc: "Actionable recommendations for your journey" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="text-primary mt-0.5">{benefit.icon}</div>
                  <div>
                    <h4 className="font-medium">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Ideal Traits */}
        <Card className="bg-gradient-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle>✨ Ideal Traits for Success</CardTitle>
            <CardDescription>Characteristics that predict success in quantum computing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Strong background in physics and mathematics",
                "High logical and abstract reasoning ability",
                "Patience for emerging technology challenges",
                "Intrinsic motivation for deep technical work",
                "Comfort with ambiguity and experimentation",
                "Persistent problem-solving mindset"
              ].map((trait, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-quantum"></div>
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Info */}
        <Card className="bg-gradient-card border-border/50 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>25-30 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📝</span>
                  <span>32 questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>4 sections</span>
                </div>
              </div>
              <Button 
                onClick={onStartAssessment}
                variant="hero"
                size="lg"
                className="quantum-glow"
              >
                Start Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};