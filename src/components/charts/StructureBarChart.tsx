
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface StructureBarChartProps {
  data: Array<{
    type: string;
    workingCapital: number;
    expansion: number;
    equipment: number;
    rate?: number;
  }>;
  showRate?: boolean;
}

const StructureBarChart = ({ data, showRate = false }: StructureBarChartProps) => {
  return (
    <BarChart 
      width={450} 
      height={220} 
      data={data}
      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
      <XAxis dataKey="type" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {showRate ? (
        <Bar dataKey="rate" fill="#33bbef" />
      ) : (
        <>
          <Bar dataKey="workingCapital" name="Working Capital" fill="#33bbef" />
          <Bar dataKey="expansion" name="Expansion" fill="#8B5CF6" />
          <Bar dataKey="equipment" name="Equipment" fill="#10b981" />
        </>
      )}
    </BarChart>
  );
};

export default StructureBarChart;
