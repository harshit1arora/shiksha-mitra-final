import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, RotateCcw, ChevronDown } from "lucide-react";
import CoachingCard from "@/components/CoachingCard";
import SuggestionPill from "@/components/SuggestionPill";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Type for student performance level
type StudentLevel = "fast" | "onTrack" | "struggling";

const Coaching = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel | null>(null);
  const [showPerformanceSection, setShowPerformanceSection] = useState(true);

  const coachingCards = [
    {
      type: "now" as const,
      title: t.coaching.cards.now,
      content: "Clap three times and say 'Freeze!' – wait for silence before giving the next instruction. This resets attention.",
    },
    {
      type: "activity" as const,
      title: t.coaching.cards.activity,
      content: "Quick counting game: 'Count backwards from 10 together!' Physical movement reengages distracted students.",
    },
    {
      type: "explain" as const,
      title: t.coaching.cards.explain,
      content: "Use the 'chunking' method – break the group activity into 3 small steps. Give one step at a time, wait for completion.",
    },
    {
      type: "interaction" as const,
      title: t.coaching.cards.interaction,
      content: "Form pairs instead of groups of 4. Assign one 'reporter' per pair who will share with the class. Reduces chaos, increases accountability.",
    },
  ];

  const suggestions = [
    t.coaching.suggestions.another,
    t.coaching.suggestions.simpler,
    t.coaching.suggestions.local,
    t.coaching.suggestions.reduce,
  ];

  // Student performance-based suggestions
  const performanceSuggestions = {
    fast: [
      {
        title: t.coaching.performance.fastFinishers.challenge,
        content: "Provide extension activities: 'Create your own problem similar to what we're learning' or 'Explain this concept to a classmate.'",
      },
      {
        title: t.coaching.performance.fastFinishers.lead,
        content: "Assign them as peer helpers: 'Can you help a classmate who's still working?' This reinforces their learning while supporting others.",
      },
      {
        title: t.coaching.performance.fastFinishers.explore,
        content: "Give them a related real-world problem to solve: 'How would this concept work in our daily lives?'",
      },
    ],
    onTrack: [
      {
        title: t.coaching.performance.onTrack.reinforce,
        content: "Provide practice worksheets with varied difficulty levels to solidify their understanding.",
      },
      {
        title: t.coaching.performance.onTrack.collaborate,
        content: "Pair them with another on-track student for a peer-review activity: 'Check each other's work and explain your thinking.'",
      },
      {
        title: t.coaching.performance.onTrack.apply,
        content: "Ask them to demonstrate the concept using manipulatives or drawings to deepen their comprehension.",
      },
    ],
    struggling: [
      {
        title: t.coaching.performance.struggling.simplify,
        content: "Break the task into smaller, manageable steps: 'Let's do the first two problems together.'",
      },
      {
        title: t.coaching.performance.struggling.visualize,
        content: "Use visual aids: 'Let's draw this out step by step.' Diagrams help make abstract concepts concrete.",
      },
      {
        title: t.coaching.performance.struggling.support,
        content: "Offer targeted support: 'I'll sit with you for 5 minutes to help you get started.' Provide positive reinforcement for effort.",
      },
    ],
  };

  const handleFeedback = (worked: boolean) => {
    navigate("/feedback", { state: { worked } });
  };

  return (
    <div className="app-container pb-32">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-foreground">
            {t.coaching.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            Class 5 • {t.subjects.maths}
          </p>
        </div>
      </header>

      {/* Problem Statement */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">{t.coaching.yourConcern}</p>
          <p className="text-foreground font-medium">
            "Students are distracted during group activity"
          </p>
        </div>
      </section>

      {/* Coaching Cards */}
      <section className="px-5 space-y-4 mb-6">
        {coachingCards.map((card, index) => (
          <CoachingCard
            key={card.type}
            type={card.type}
            title={card.title}
            content={card.content}
            className={`fade-in-up-delay-${index + 1}`}
          />
        ))}
      </section>

      {/* Suggestion Bar */}
      <section className="px-5 mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
          {t.coaching.quickAdjustments}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {suggestions.map((suggestion) => (
            <SuggestionPill
              key={suggestion}
              label={suggestion}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Student Performance-Based Suggestions */}
      <section className="px-5 mb-8">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setShowPerformanceSection(!showPerformanceSection)}
        >
          <h2 className="text-base font-medium text-foreground">
            {t.coaching.performance.title}
          </h2>
          <ChevronDown 
            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${showPerformanceSection ? 'rotate-180' : ''}`}
          />
        </div>

        {showPerformanceSection && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {t.coaching.performance.subtitle}
            </p>
            
            {/* Student Level Selection */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setSelectedLevel(prev => prev === 'fast' ? null : 'fast')}
                className={`p-3 rounded-xl border transition-all ${selectedLevel === 'fast' 
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card hover:bg-secondary/50'}`}
              >
                <p className="text-sm font-medium">{t.coaching.performance.fastFinishers.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.coaching.performance.fastFinishers.description}
                </p>
              </button>
              
              <button
                onClick={() => setSelectedLevel(prev => prev === 'onTrack' ? null : 'onTrack')}
                className={`p-3 rounded-xl border transition-all ${selectedLevel === 'onTrack' 
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card hover:bg-secondary/50'}`}
              >
                <p className="text-sm font-medium">{t.coaching.performance.onTrack.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.coaching.performance.onTrack.description}
                </p>
              </button>
              
              <button
                onClick={() => setSelectedLevel(prev => prev === 'struggling' ? null : 'struggling')}
                className={`p-3 rounded-xl border transition-all ${selectedLevel === 'struggling' 
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card hover:bg-secondary/50'}`}
              >
                <p className="text-sm font-medium">{t.coaching.performance.struggling.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.coaching.performance.struggling.description}
                </p>
              </button>
            </div>
            
            {/* Selected Level Suggestions */}
            {selectedLevel && (
              <div className="space-y-4">
                {performanceSuggestions[selectedLevel].map((suggestion, index) => (
                  <div 
                    key={index}
                    className={`bg-card rounded-xl p-4 border border-border shadow-sm fade-in-up-delay-${index + 1}`}
                  >
                    <h3 className="font-medium text-foreground text-sm mb-2">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Feedback Section */}
      <section className="px-5">
        <p className="text-sm text-muted-foreground text-center mb-4">
          {t.coaching.didThisHelp}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleFeedback(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-coaching-explain text-coaching-explain-accent font-medium transition-all hover:opacity-90 active:scale-98"
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{t.coaching.thisWorked}</span>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted text-muted-foreground font-medium transition-all hover:bg-muted/80 active:scale-98"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.coaching.tryAgain}</span>
          </button>
        </div>
      </section>

      {/* Peer Wisdom Button */}
      <section className="px-5 mt-6">
        <Button
          onClick={() => navigate("/peer-wisdom")}
          variant="secondary"
          className="w-full h-14 text-base font-semibold rounded-xl"
        >
          <span>{t.nav.peerWisdom}</span>
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Coaching;
