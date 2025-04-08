
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface DefaultDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: Record<string, string>;
}

const DefaultDistributionChart = ({ data, colors }: DefaultDistributionChartProps) => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={index === 0 ? colors.small : index === 1 ? colors.medium : colors.large} 
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DefaultDistributionChart;
