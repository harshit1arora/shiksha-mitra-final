import { ArrowLeft, Users, Layers, Lightbulb, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResourceCluster from "@/components/ResourceCluster";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const Resources = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const clusters = [
    {
      title: t.resources.clusters.classroomManagement,
      description: t.resources.clusters.classroomManagementDesc,
      icon: <Users className="w-5 h-5 text-coaching-now-accent" />,
      colorClass: "bg-coaching-now",
      videos: [
        { id: "1", title: "Quick attention-getters for busy classrooms", duration: "4:32" },
        { id: "2", title: "Smooth transitions between activities", duration: "5:18" },
        { id: "3", title: "Managing group work effectively", duration: "6:45" },
      ],
    },
    {
      title: t.resources.clusters.mixedLevel,
      description: t.resources.clusters.mixedLevelDesc,
      icon: <Layers className="w-5 h-5 text-coaching-activity-accent" />,
      colorClass: "bg-coaching-activity",
      videos: [
        { id: "4", title: "Tiered activities for different learners", duration: "5:20" },
        { id: "5", title: "Peer tutoring that works", duration: "4:55" },
      ],
    },
    {
      title: t.resources.clusters.conceptClarity,
      description: t.resources.clusters.conceptClarityDesc,
      icon: <Lightbulb className="w-5 h-5 text-coaching-explain-accent" />,
      colorClass: "bg-coaching-explain",
      videos: [
        { id: "6", title: "Using local examples for abstract concepts", duration: "6:10" },
        { id: "7", title: "Visual aids from everyday materials", duration: "4:40" },
        { id: "8", title: "Checking for understanding quickly", duration: "3:55" },
      ],
    },
    {
      title: t.resources.clusters.studentEngagement,
      description: t.resources.clusters.studentEngagementDesc,
      icon: <Sparkles className="w-5 h-5 text-coaching-interaction-accent" />,
      colorClass: "bg-coaching-interaction",
      videos: [
        { id: "9", title: "Low-prep games for learning", duration: "5:30" },
        { id: "10", title: "Questioning techniques that work", duration: "4:15" },
      ],
    },
  ];

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
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-foreground">
            {t.resources.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t.resources.subtitle}
          </p>
        </div>
      </header>

      {/* Clusters */}
      <section className="px-5 space-y-4">
        {clusters.map((cluster, index) => (
          <div key={cluster.title} className={`fade-in-up-delay-${index + 1}`}>
            <ResourceCluster
              title={cluster.title}
              description={cluster.description}
              videos={cluster.videos}
              icon={cluster.icon}
              colorClass={cluster.colorClass}
            />
          </div>
        ))}
      </section>

      <BottomNav />
    </div>
  );
};

export default Resources;
