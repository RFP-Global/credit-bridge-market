
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface RadarChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  colors?: string[];
  width?: number;
  height?: number;
}

const CustomRadarChart = ({ 
  data, 
  dataKeys, 
  colors = ['#33bbef', '#0ea5e9', '#38bdf8', '#0284c7'], 
  width = 450, 
  height = 220 
}: RadarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#444" />
        <PolarAngleAxis dataKey="subject" stroke="#888" />
        <PolarRadiusAxis stroke="#888" />
        <Tooltip content={<CustomTooltip />} />
        
        {dataKeys.map((key, index) => (
          <Radar
            key={key}
            name={key}
            dataKey={key}
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            fillOpacity={0.3}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadarChart;
