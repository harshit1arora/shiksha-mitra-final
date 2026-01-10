import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="app-container min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        {/* Shiksha Mitra Logo */}
        <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center">
          <span className="text-5xl font-bold text-primary-foreground">SM</span>
        </div>
        
        {/* App Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Shiksha Mitra
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Teaching Coach
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
