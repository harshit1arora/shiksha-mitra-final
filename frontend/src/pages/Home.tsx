import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassChip from "@/components/ClassChip";
import SubjectCard from "@/components/SubjectCard";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, MessageSquare, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type SubjectType = "maths" | "hindi" | "science" | "evs" | "social";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);

  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const subjects: SubjectType[] = ["maths", "hindi", "science", "evs", "social"];

  const handleContinue = () => {
    if (selectedClass && selectedSubject) {
      navigate("/voice-input");
    }
  };

  return (
    <div className="app-container pb-24 bg-gradient-to-b from-background to-background/95">
      {/* Header with Gradient */}
      <header className="px-5 pt-12 pb-8 bg-gradient-to-r from-primary to-primary/80 rounded-b-3xl shadow-lg animate-gradient">
        {/* Logo and App Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 animate-float">
              <span className="text-3xl font-bold text-white">SM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Shiksha Mitra
              </h1>
              <p className="text-white/90 text-sm">Teaching Coach</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Welcome Message */}
        <div className="text-white space-y-2">
          <h2 className="text-xl font-semibold">
            {t.home.greeting}
          </h2>
          <p className="text-white/80 text-sm">
            {t.home.subtitle}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 -mt-4">
        {/* Class Selection */}
        <section className="mb-8 animate-fade-in-up">
          <div className="bg-card rounded-2xl shadow-xl p-5 border border-border hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="h-6 w-1 bg-primary rounded-full"></span>
              {t.home.selectClass}
            </h2>
            <div className="flex flex-wrap gap-2">
              {classes.map((classNum) => (
                <ClassChip
                  key={classNum}
                  classNumber={classNum}
                  isSelected={selectedClass === classNum}
                  onClick={() => setSelectedClass(classNum)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Subject Selection */}
        <section className="mb-8 animate-fade-in-up-delay-1">
          <div className="bg-card rounded-2xl shadow-xl p-5 border border-border hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="h-6 w-1 bg-primary rounded-full"></span>
              {t.home.selectSubject}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {subjects.slice(0, 3).map((subject) => (
                <SubjectCard
                  key={subject}
                  subject={subject}
                  isSelected={selectedSubject === subject}
                  onClick={() => setSelectedSubject(subject)}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {subjects.slice(3).map((subject) => (
                <SubjectCard
                  key={subject}
                  subject={subject}
                  isSelected={selectedSubject === subject}
                  onClick={() => setSelectedSubject(subject)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Continue Button */}
        {selectedClass && selectedSubject && (
          <section className="mb-8 animate-fade-in-up-delay-2">
            <Button
              onClick={handleContinue}
              className="w-full h-16 text-base font-semibold rounded-2xl gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 animate-scale-hover"
            >
              {t.home.continueBtn}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </section>
        )}

        {/* Quick Actions Section */}
        <section className="mb-6 animate-fade-in-up-delay-3">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-1 bg-primary rounded-full"></span>
            Quick Actions
          </h2>
          
          {/* Action Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Peer Wisdom */}
            <button
              onClick={() => navigate("/peer-wisdom")}
              className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{t.nav.peerWisdom}</span>
            </button>
            
            {/* Daily Reflection */}
            <button
              onClick={() => navigate("/daily-reflection")}
              className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{t.nav.dailyReflection}</span>
            </button>
            
            {/* Parent Bridge */}
            <button
              onClick={() => navigate("/parent-bridge")}
              className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Parent Bridge</span>
            </button>
            
            {/* Activity Generator */}
            <button
              onClick={() => navigate("/activity-generator")}
              className="bg-card rounded-xl shadow-lg p-4 border border-border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center gap-3 hover:border-primary/50 animate-scale-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Activity Generator</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
