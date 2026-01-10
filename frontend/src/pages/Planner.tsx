import { useState } from "react";
import { ArrowLeft, Lightbulb, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/BottomNav";
import SmartSuggestionBar from "@/components/SmartSuggestionBar";
import CuratedVideoSupport from "@/components/CuratedVideoSupport";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSystemInsights } from "@/hooks/useSystemInsights";

// Types
interface InteractiveMethod {
  id: string;
  name: string;
  description: string;
  duration: string;
}

interface PlanItem {
  id: string;
  topic: string;
  time: string;
  challenge?: string;
  syllabusAlignment?: string;
  competencies?: string[];
  interactiveMethods?: InteractiveMethod[];
}



const Planner = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logInsight } = useSystemInsights();
  const [activeTab, setActiveTab] = useState<"weekly" | "daily">('daily');
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("");
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock interactive methods database
  const interactiveMethods: InteractiveMethod[] = [
    {
      id: "1",
      name: "Think-Pair-Share",
      description: "Students think individually, pair up to discuss, then share with the class",
      duration: "10-15 min"
    },
    {
      id: "2",
      name: "Group Rotation Stations",
      description: "Students rotate through different activity stations to learn various concepts",
      duration: "20-30 min"
    },
    {
      id: "3",
      name: "Peer Teaching",
      description: "Students teach each other specific concepts to reinforce learning",
      duration: "15-20 min"
    },
    {
      id: "4",
      name: "Hands-on Experiment",
      description: "Practical activity to demonstrate theoretical concepts",
      duration: "25-35 min"
    },
    {
      id: "5",
      name: "Role Play",
      description: "Students act out scenarios to understand real-world applications",
      duration: "15-25 min"
    }
  ];

  // Mock AI plan generation
  const generateAIPlan = () => {
    if (!grade || !subject || !timeAvailable) return;
    
    setIsGenerating(true);
    
    // Log insight: Plan generation started
    logInsight('planner', 'generate-plan-start', {
      planType: activeTab,
      grade,
      subject,
      timeAvailable
    });
    
    // Simulate AI processing delay
    setTimeout(() => {
      const newPlans: PlanItem[] = [];
      
      if (activeTab === 'daily') {
        // Generate daily plan
        newPlans.push({
          id: Date.now().toString(),
          topic: `${subject} Basics`,
          time: timeAvailable,
          syllabusAlignment: `State Board ${grade} ${subject} Chapter 2`,
          competencies: ['Understanding basic concepts', 'Application skills', 'Critical thinking'],
          interactiveMethods: interactiveMethods.slice(0, 2)
        });
      } else {
        // Generate weekly plans (5 days)
        const topics = [
          `${subject} Fundamentals`,
          `${subject} Application`,
          `${subject} Practice`,
          `${subject} Review`,
          `${subject} Assessment`
        ];
        
        topics.forEach((topic, index) => {
          newPlans.push({
            id: (Date.now() + index).toString(),
            topic,
            time: timeAvailable,
            syllabusAlignment: `State Board ${grade} ${subject} Chapter ${index + 1}`,
            competencies: ['Knowledge acquisition', 'Skill development', 'Problem solving'],
            interactiveMethods: interactiveMethods.slice(index % 3, index % 3 + 2)
          });
        });
      }
      
      setPlans(newPlans);
      setIsGenerating(false);
      
      // Log insight: Plan generation completed
      logInsight('planner', 'generate-plan-complete', {
        planType: activeTab,
        grade,
        subject,
        planCount: newPlans.length.toString()
      });
    }, 1500);
  };

  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground ml-2">
          {t.planner.title}
        </h1>
      </header>

      {/* Tabs for Weekly/Daily */}
      <section className="px-5 mb-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "weekly" | "daily")}>
          <TabsList className="w-full">
            <TabsTrigger value="daily" className="flex-1">
              {t.planner.daily}
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1">
              {t.planner.weekly}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            {/* Selection Form */}
            <div className="bg-card rounded-xl p-4 border border-border shadow-sm space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t.planner.grade}
                </label>
                <Select onValueChange={setGrade} value={grade}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t.planner.gradePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t.planner.grade1}</SelectItem>
                    <SelectItem value="2">{t.planner.grade2}</SelectItem>
                    <SelectItem value="3">{t.planner.grade3}</SelectItem>
                    <SelectItem value="4">{t.planner.grade4}</SelectItem>
                    <SelectItem value="5">{t.planner.grade5}</SelectItem>
                    <SelectItem value="6">{t.planner.grade6}</SelectItem>
                    <SelectItem value="7">{t.planner.grade7}</SelectItem>
                    <SelectItem value="8">{t.planner.grade8}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t.planner.subject}
                </label>
                <Select onValueChange={setSubject} value={subject}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t.planner.subjectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">{t.planner.math}</SelectItem>
                    <SelectItem value="Science">{t.planner.science}</SelectItem>
                    <SelectItem value="English">{t.planner.english}</SelectItem>
                    <SelectItem value="Hindi">{t.planner.hindi}</SelectItem>
                    <SelectItem value="Social Studies">{t.planner.social}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t.planner.timeAvailable}
                </label>
                <Select onValueChange={setTimeAvailable} value={timeAvailable}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t.planner.timePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 min">30 {t.planner.minutes}</SelectItem>
                    <SelectItem value="45 min">45 {t.planner.minutes}</SelectItem>
                    <SelectItem value="60 min">60 {t.planner.minutes}</SelectItem>
                    <SelectItem value="90 min">90 {t.planner.minutes}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={generateAIPlan} 
                className="w-full" 
                disabled={!grade || !subject || !timeAvailable || isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    {t.planner.generating}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    {t.planner.generatePlan}
                  </span>
                )}
              </Button>
            </div>
            
            {/* AI Generated Plans */}
            {plans.length > 0 && (
              <div className="mt-6 space-y-5">
                <h2 className="text-base font-medium text-foreground">
                  {activeTab === 'daily' ? t.planner.dailyPlan : t.planner.weeklyPlan}
                </h2>
                
                <div className="space-y-4">
                  {plans.map((plan, index) => (
                    <div
                      key={plan.id}
                      className={`bg-card rounded-xl p-5 border border-border shadow-sm fade-in-up-delay-${index + 1}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-foreground text-base">{plan.topic}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {plan.time}
                        </span>
                      </div>
                      
                      {/* Syllabus Alignment */}
                      {plan.syllabusAlignment && (
                        <div className="flex items-start gap-2 mt-3 p-3 bg-secondary/50 rounded-lg">
                          <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">{t.planner.syllabus}</p>
                            <p className="text-sm text-foreground">{plan.syllabusAlignment}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Competencies */}
                      {plan.competencies && plan.competencies.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-muted-foreground mb-2">{t.planner.competencies}</p>
                          <div className="flex flex-wrap gap-2">
                            {plan.competencies.map((competency, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full"
                              >
                                {competency}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Interactive Methods */}
                      {plan.interactiveMethods && plan.interactiveMethods.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {t.planner.interactiveMethods}
                          </p>
                          
                          <div className="space-y-3">
                            {plan.interactiveMethods.map((method) => (
                              <div key={method.id} className="border-l-2 border-primary pl-3 py-1">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium text-foreground">{method.name}</p>
                                  <span className="text-xs text-muted-foreground">{method.duration}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Curated Video Support */}
            {plans.length > 0 && (
              <div className="mt-8">
                <CuratedVideoSupport 
                  topic={plans[0].topic} 
                  videos={[]} 
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <SmartSuggestionBar />
      <BottomNav />
    </div>
  );
};

export default Planner;
