
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  colors?: string[];
  width?: number;
  height?: number;
  label?: string;
}

const CustomGaugeChart = ({
  value,
  min = 0,
  max = 100,
  colors = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc'],
  width = 450,
  height = 220,
  label = '',
}: GaugeChartProps) => {
  // Normalize value between 0 and 100
  const normalizedValue = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  
  // Create data for the active part and the background
  const data = [
    { name: 'active', value: normalizedValue },
    { name: 'inactive', value: 100 - normalizedValue },
  ];

  // Calculate color based on value
  const getColor = (value: number) => {
    if (value <= 25) return colors[0];
    if (value <= 50) return colors[1];
    if (value <= 75) return colors[2];
    return colors[3];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius={80}
          outerRadius={100}
          paddingAngle={0}
          dataKey="value"
          cornerRadius={5}
          stroke="none"
        >
          <Cell key="active" fill={getColor(normalizedValue)} />
          <Cell key="inactive" fill="#2a2a2a" />
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold"
          fill="#fff"
        >
          {value}
        </text>
        {label && (
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs"
            fill="#888"
          >
            {label}
          </text>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomGaugeChart;
