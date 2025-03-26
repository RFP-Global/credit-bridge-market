
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface CustomAreaChartProps {
  data: Array<Record<string, any>>;
  dataKeys: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  xAxisKey: string;
  width?: number;
  height?: number;
  stacked?: boolean;
}

const CustomAreaChart = ({ 
  data, 
  dataKeys,
  xAxisKey,
  width = 450, 
  height = 220,
  stacked = false
}: CustomAreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey={xAxisKey} stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        
        {dataKeys.map((item, index) => (
          <Area
            key={item.key}
            type="monotone"
            dataKey={item.key}
            name={item.name}
            stackId={stacked ? "1" : `stack-${index}`}
            stroke={item.color}
            fill={item.color}
            fillOpacity={0.6}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
