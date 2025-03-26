
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize } from "lucide-react";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-6 right-20 z-50 bg-background/20 backdrop-blur-sm hover:bg-background/40 border border-primary/20"
      onClick={toggleFullscreen}
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize className="h-5 w-5 text-primary" />
      ) : (
        <Maximize className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
};

export default FullscreenButton;
