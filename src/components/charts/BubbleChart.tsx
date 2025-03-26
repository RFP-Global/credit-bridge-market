
import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  ZAxis
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { COLORS } from './ChartUtils';

interface BubbleChartProps {
  data: Array<{
    name: string;
    data: Array<{
      x: number;
      y: number;
      z: number;
      [key: string]: any;
    }>;
  }>;
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
  width?: number;
  height?: number;
}

const CustomBubbleChart = ({ 
  data, 
  xLabel = "X Axis",
  yLabel = "Y Axis",
  zLabel = "Size",
  width = 450, 
  height = 220 
}: BubbleChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis type="number" dataKey="x" name={xLabel} stroke="#888" />
        <YAxis type="number" dataKey="y" name={yLabel} stroke="#888" />
        <ZAxis type="number" dataKey="z" name={zLabel} range={[60, 400]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        
        {data.map((entry, index) => (
          <Scatter 
            key={entry.name} 
            name={entry.name} 
            data={entry.data} 
            fill={COLORS[index % COLORS.length]} 
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CustomBubbleChart;
