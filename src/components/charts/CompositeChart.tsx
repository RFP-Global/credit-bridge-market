
import React from 'react';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Area,
  ResponsiveContainer
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface CompositeChartProps {
  data: Array<Record<string, any>>;
  xAxisKey: string;
  barKeys?: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  lineKeys?: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  areaKeys?: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  width?: number;
  height?: number;
}

const CustomCompositeChart = ({ 
  data, 
  xAxisKey,
  barKeys = [],
  lineKeys = [],
  areaKeys = [],
  width = 450, 
  height = 220 
}: CompositeChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart 
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        
        {areaKeys.map(item => (
          <Area 
            key={item.key}
            type="monotone" 
            dataKey={item.key} 
            name={item.name}
            fill={item.color} 
            stroke={item.color}
            fillOpacity={0.3}
          />
        ))}
        
        {barKeys.map(item => (
          <Bar 
            key={item.key}
            dataKey={item.key} 
            name={item.name}
            fill={item.color} 
          />
        ))}
        
        {lineKeys.map(item => (
          <Line 
            key={item.key}
            type="monotone" 
            dataKey={item.key} 
            name={item.name}
            stroke={item.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CustomCompositeChart;
