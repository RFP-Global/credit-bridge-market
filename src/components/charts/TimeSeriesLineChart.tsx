
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface TimeSeriesLineChartProps {
  data: Array<{
    month: string;
    [key: string]: string | number;
  }>;
  lines: Array<{
    dataKey: string;
    name: string;
    color: string;
  }>;
}

const TimeSeriesLineChart = ({ data, lines }: TimeSeriesLineChartProps) => {
  return (
    <LineChart 
      width={450} 
      height={220} 
      data={data}
      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="month" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {lines.map((line, index) => (
        <Line 
          key={index}
          type="monotone" 
          dataKey={line.dataKey} 
          name={line.name} 
          stroke={line.color} 
          strokeWidth={2}
          dot={{ r: 4 }} 
        />
      ))}
    </LineChart>
  );
};

export default TimeSeriesLineChart;
