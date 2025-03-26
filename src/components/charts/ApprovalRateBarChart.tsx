
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface ApprovalRateBarChartProps {
  data: Array<{
    category: string;
    approved: number;
    rejected: number;
  }>;
}

const ApprovalRateBarChart = ({ data }: ApprovalRateBarChartProps) => {
  return (
    <BarChart 
      width={450} 
      height={220} 
      data={data}
      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
      <XAxis dataKey="category" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="approved" name="Approved" fill="#10b981" />
      <Bar dataKey="rejected" name="Rejected" fill="#F97316" />
    </BarChart>
  );
};

export default ApprovalRateBarChart;
