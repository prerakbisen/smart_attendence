import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  BookOpen,
  Target,
  Coffee,
  Gamepad2,
  Dumbbell,
  Brain,
  Users,
  Plus,
  Save,
  Download
} from 'lucide-react';

const DailyRoutine = () => {
  const [studentName, setStudentName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [generatedRoutine, setGeneratedRoutine] = useState<any>(null);

  const goals = [
    { id: 'academic', label: 'Academic Excellence', icon: BookOpen, color: 'bg-primary' },
    { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell, color: 'bg-success' },
    { id: 'skills', label: 'Skill Development', icon: Brain, color: 'bg-accent' },
    { id: 'social', label: 'Social Activities', icon: Users, color: 'bg-secondary' },
    { id: 'career', label: 'Career Preparation', icon: Target, color: 'bg-info' },
    { id: 'creative', label: 'Creative Pursuits', icon: Gamepad2, color: 'bg-warning' },
  ];

  const sampleRoutine = {
    student: "Alex Johnson",
    class: "CS-A",
    schedule: [
      { time: "9:00 AM", activity: "Data Structures", type: "class", duration: "60 min", icon: BookOpen },
      { time: "10:00 AM", activity: "Programming Lab", type: "lab", duration: "90 min", icon: BookOpen },
      { time: "11:30 AM", activity: "Free Period - Code Practice", type: "free", duration: "30 min", icon: Brain },
      { time: "12:00 PM", activity: "Lunch Break", type: "break", duration: "60 min", icon: Coffee },
      { time: "1:00 PM", activity: "Mathematics", type: "class", duration: "60 min", icon: BookOpen },
      { time: "2:00 PM", activity: "Free Period - Group Study", type: "free", duration: "60 min", icon: Users },
      { time: "3:00 PM", activity: "Sports/Fitness", type: "activity", duration: "60 min", icon: Dumbbell },
      { time: "4:00 PM", activity: "Project Work", type: "free", duration: "90 min", icon: Target },
    ],
    goals: ["Academic Excellence", "Skill Development", "Career Preparation"],
    suggestions: [
      "Focus on coding practice during free periods",
      "Join study groups for collaborative learning",
      "Maintain regular exercise routine",
      "Work on personal projects to build portfolio"
    ]
  };

  const generateRoutine = () => {
    setGeneratedRoutine(sampleRoutine);
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'class': return BookOpen;
      case 'lab': return Brain;
      case 'free': return Clock;
      case 'break': return Coffee;
      case 'activity': return Dumbbell;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'class': return 'border-l-primary bg-primary/5';
      case 'lab': return 'border-l-secondary bg-secondary/5';
      case 'free': return 'border-l-accent bg-accent/5';
      case 'break': return 'border-l-warning bg-warning/5';
      case 'activity': return 'border-l-success bg-success/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="gradient-secondary rounded-xl p-8 text-white shadow-medium">
        <h2 className="text-3xl font-bold mb-2">Daily Routine Generator</h2>
        <p className="text-xl opacity-90">
          Create personalized schedules for optimal learning and development
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="class">Class/Section</Label>
                <Input
                  id="class"
                  placeholder="e.g., CS-A, IT-B"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="interests">Interests/Strengths</Label>
                <Input
                  id="interests"
                  placeholder="e.g., Programming, Sports"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-accent" />
                Select Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {goals.map((goal) => {
                  const IconComponent = goal.icon;
                  const isSelected = selectedGoals.includes(goal.id);
                  
                  return (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-bounce ${
                        isSelected 
                          ? 'border-primary bg-primary/10 shadow-soft' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${goal.color} text-white`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-foreground">{goal.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button 
                onClick={generateRoutine}
                variant="academic" 
                className="w-full mt-6 transition-bounce"
                disabled={!studentName || selectedGoals.length === 0}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Generate Routine
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Routine */}
        <div className="lg:col-span-2">
          {generatedRoutine ? (
            <div className="space-y-6">
              {/* Routine Header */}
              <Card className="shadow-medium gradient-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Daily Routine for {generatedRoutine.student}</CardTitle>
                      <p className="text-muted-foreground mt-1">Class: {generatedRoutine.class}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {generatedRoutine.goals.map((goal: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Timeline */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {generatedRoutine.schedule.map((item: any, index: number) => {
                      const IconComponent = getActivityIcon(item.type);
                      
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${getActivityColor(item.type)} transition-smooth hover:shadow-soft`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-foreground">{item.time}</span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{item.activity}</p>
                                <p className="text-sm text-muted-foreground">{item.duration}</p>
                              </div>
                            </div>
                            <Badge variant={item.type === 'free' ? 'secondary' : 'default'}>
                              {item.type}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-accent" />
                    AI-Powered Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {generatedRoutine.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                        <p className="text-foreground">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-soft h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Ready to Generate Your Routine
                </h3>
                <p className="text-muted-foreground">
                  Fill in the student information and select goals to create a personalized daily routine
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyRoutine;