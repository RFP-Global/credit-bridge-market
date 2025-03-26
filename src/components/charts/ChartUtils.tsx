
import React from 'react';

// Function to render the customized label for pie charts
export const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
  index 
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#fff" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Updated colors to match the homepage UX
export const COLORS = ['#33bbef', '#10b981', '#8B5CF6', '#F97316', '#fbd024'];
export const DARK_COLORS = ['#0284c7', '#059669', '#6d28d9', '#c2410c', '#ca8a04'];
