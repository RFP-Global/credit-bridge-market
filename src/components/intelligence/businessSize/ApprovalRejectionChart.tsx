
import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ApprovalRejectionChartProps {
  data: Array<{
    category: string;
    approved: number;
    rejected: number;
  }>;
  colors: Record<string, string>;
}

const ApprovalRejectionChart = ({ data, colors }: ApprovalRejectionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis dataKey="category" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend />
        <Bar dataKey="approved" name="Approved" fill={colors.approved} />
        <Bar dataKey="rejected" name="Rejected" fill={colors.rejected} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ApprovalRejectionChart;
