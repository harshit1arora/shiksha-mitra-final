import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const Certificate = () => {
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
          {t.certificate.title}
        </h1>
      </header>

      {/* Certificate Preview */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-card rounded-xl border-2 border-primary/20 shadow-sm overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-primary">SM</span>
            </div>
            <p className="text-xs text-primary uppercase tracking-widest font-medium">
              {t.login.appName}
            </p>
          </div>

          {/* Certificate Body */}
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold text-foreground mb-2">
              {t.certificate.header}
            </h2>
            
            <p className="text-sm text-muted-foreground mb-6">
              {t.certificate.certify}
            </p>

            <p className="text-xl font-semibold text-primary mb-6">
              Sunita Mishra
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t.certificate.description}
            </p>

            <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border">
              <span>January 2025</span>
              <span>{t.login.appName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-5 mb-6 fade-in-up-delay-1">
        <p className="text-sm text-muted-foreground text-center">
          {t.certificate.recognises}
        </p>
      </section>

      {/* Download Button */}
      <section className="px-5 fade-in-up-delay-2">
        <Button className="w-full h-14 text-base font-semibold rounded-xl gap-2">
          <Download className="w-5 h-5" />
          {t.certificate.download}
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Certificate;
