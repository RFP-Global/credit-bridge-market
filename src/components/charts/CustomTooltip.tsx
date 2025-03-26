
import React from 'react';

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-blue-800/50 p-2 shadow-lg backdrop-blur-sm text-xs font-mono">
        {label && <p className="text-blue-400 font-medium mb-1">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name || entry.dataKey}: ${entry.value !== undefined ? entry.value : ''}`}
            {entry.payload && entry.dataKey && typeof entry.payload[entry.dataKey] === 'number' && 
              ` (${entry.payload[entry.dataKey].toLocaleString()})`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
