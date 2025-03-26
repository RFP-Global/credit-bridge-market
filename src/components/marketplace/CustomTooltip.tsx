
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 border border-gray-700 p-3 shadow-lg backdrop-blur-sm text-xs rounded-sm">
        <p className="text-gray-200 font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 inline-block" style={{ backgroundColor: entry.color }}></span>
            <span className="text-gray-300">{entry.name}:</span>
            <span className="text-white font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
