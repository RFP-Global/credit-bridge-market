
import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface LoanRequestChartProps {
  data: Array<{
    name: string;
    workingCapital: number;
    expansion: number;
    equipment: number;
    rate?: number;
  }>;
  colors: Record<string, string>;
}

const LoanRequestChart = ({ data, colors }: LoanRequestChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend />
        <Bar dataKey="workingCapital" name="Working Capital" fill={colors.workingCapital} />
        <Bar dataKey="expansion" name="Expansion" fill={colors.expansion} />
        <Bar dataKey="equipment" name="Equipment" fill={colors.equipment} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LoanRequestChart;
