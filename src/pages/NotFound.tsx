
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Radar, Signal, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center">
        <div className="text-center max-w-md border border-primary/20 bg-background/50 backdrop-blur-sm p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
          
          <div className="relative mx-auto mb-8 w-24 h-24">
            <Radar className="h-24 w-24 text-primary/30" />
            <Signal className="h-16 w-16 text-primary/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-primary">404</div>
          </div>
          
          <h1 className="text-2xl font-mono font-bold mb-4">SIGNAL LOST</h1>
          <p className="text-md text-muted-foreground mb-8">
            The requested coordinates could not be located in our system.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home Base
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
