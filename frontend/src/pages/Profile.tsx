import { ArrowLeft, Award, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
          {t.profile.title}
        </h1>
      </header>

      {/* Profile Info */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">SM</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Sunita Mishra
              </h2>
              <p className="text-sm text-muted-foreground">
                +91 98765 43210
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">{t.profile.classes}</span>
              <span className="text-sm font-medium text-foreground">
                Class 4, 5, 6
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">{t.profile.subjects}</span>
              <span className="text-sm font-medium text-foreground">
                {t.subjects.maths}, {t.subjects.evs}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">{t.profile.language}</span>
              <span className="text-sm font-medium text-foreground">
                {t.subjects.hindi}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Language Toggle */}
      <section className="px-5 mb-6 fade-in-up-delay-1">
        <LanguageToggle />
      </section>

      {/* Certificate Section */}
      <section className="px-5 mb-6 fade-in-up-delay-2">
        <button
          onClick={() => navigate("/certificate")}
          className="w-full bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-4 hover:bg-muted/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <Award className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-medium text-foreground">{t.profile.certificate}</h3>
            <p className="text-sm text-muted-foreground">
              {t.profile.certificateDesc}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </section>

      {/* Logout */}
      <section className="px-5 fade-in-up-delay-3">
        <Button
          variant="outline"
          className="w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive"
        >
          <LogOut className="w-4 h-4" />
          {t.profile.logout}
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Profile;
