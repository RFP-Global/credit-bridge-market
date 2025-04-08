
import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface LoanTermsChartProps {
  data: Array<{
    month: string;
    small: number;
    medium: number;
    large: number;
  }>;
  colors: Record<string, string>;
}

const LoanTermsChart = ({ data, colors }: LoanTermsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="month" stroke="#888" />
        <YAxis stroke="#888" domain={[0, 50]} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="small" 
          name="Small Business" 
          stroke={colors.small} 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="medium" 
          name="Medium Business" 
          stroke={colors.medium} 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="large" 
          name="Large Business" 
          stroke={colors.large} 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoanTermsChart;
