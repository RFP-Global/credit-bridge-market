
import React from 'react';
import { ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { COLORS } from './ChartUtils';

interface FunnelChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  width?: number;
  height?: number;
}

const CustomFunnelChart = ({ 
  data, 
  width = 450, 
  height = 220 
}: FunnelChartProps) => {
  // Sort data from highest to lowest value
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const maxValue = sortedData[0]?.value || 1;
  const totalHeight = height * 0.8; // Leave space for labels

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        {sortedData.map((item, index) => {
          const widthPercentage = (item.value / maxValue) * 100;
          const sectionHeight = totalHeight / sortedData.length;
          const color = COLORS[index % COLORS.length];
          
          return (
            <div key={item.name} style={{ width: '100%', position: 'relative', height: sectionHeight }}>
              <div 
                style={{
                  width: `${widthPercentage}%`,
                  height: '85%',
                  backgroundColor: color,
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '2px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomFunnelChart;
