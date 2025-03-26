
import React from 'react';
import { Radar } from 'lucide-react';

interface RadarScreenProps {
  className?: string;
}

const RadarScreen: React.FC<RadarScreenProps> = ({ className = '' }) => {
  return (
    <div className={`radar-screen-container ${className}`}>
      <div className="radar-screen">
        <div className="radar-screen-grid"></div>
        <div className="radar-screen-center">
          <Radar className="h-6 w-6 text-cyan-400 opacity-70" />
        </div>
        <div className="radar-screen-sweep"></div>
        <div className="radar-screen-ping radar-screen-ping-1"></div>
        <div className="radar-screen-ping radar-screen-ping-2"></div>
        <div className="radar-screen-ping radar-screen-ping-3"></div>
      </div>
    </div>
  );
};

export default RadarScreen;
