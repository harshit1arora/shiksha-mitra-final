import { cn } from "@/lib/utils";
import { Play, ChevronRight } from "lucide-react";

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail?: string;
}

interface ResourceClusterProps {
  title: string;
  description: string;
  videos: Video[];
  icon: React.ReactNode;
  colorClass: string;
}

const ResourceCluster = ({ title, description, videos, icon, colorClass }: ResourceClusterProps) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("p-2 rounded-lg", colorClass)}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        {videos.slice(0, 2).map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="relative w-16 h-10 bg-muted rounded-md flex items-center justify-center overflow-hidden">
              <Play className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {video.title}
              </p>
              <p className="text-xs text-muted-foreground">{video.duration}</p>
            </div>
          </div>
        ))}
      </div>
      
      {videos.length > 2 && (
        <p className="text-xs text-primary font-medium mt-2 text-center">
          +{videos.length - 2} more videos
        </p>
      )}
    </div>
  );
};

export default ResourceCluster;
