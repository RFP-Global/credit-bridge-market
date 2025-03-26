
import React from 'react';
import { 
  Treemap, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { COLORS } from './ChartUtils';

interface TreemapChartProps {
  data: Array<{
    name: string;
    size: number;
    [key: string]: any;
  }>;
  width?: number;
  height?: number;
}

const CustomTreemapChart = ({ 
  data, 
  width = 450, 
  height = 220 
}: TreemapChartProps) => {

  const colorScale = (index: number) => {
    return COLORS[index % COLORS.length];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Treemap
        data={data}
        dataKey="size"
        stroke="#000"
        fill="#0ea5e9"
        content={({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
          return (
            <g>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                  fill: colorScale(index),
                  stroke: '#000',
                  strokeWidth: 1,
                  strokeOpacity: 0.2,
                }}
              />
              {width > 40 && height > 40 && (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={10}
                >
                  {name}
                </text>
              )}
            </g>
          );
        }}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default CustomTreemapChart;
