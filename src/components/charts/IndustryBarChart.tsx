
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface IndustryBarChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

const IndustryBarChart = ({ data }: IndustryBarChartProps) => {
  return (
    <BarChart 
      width={450} 
      height={220} 
      data={data}
      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
      <XAxis dataKey="name" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="value" fill="#33bbef">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || '#33bbef'} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default IndustryBarChart;
