
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { renderCustomizedLabel } from "./ChartUtils";

interface BusinessSizePieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

const BusinessSizePieChart = ({ data, colors }: BusinessSizePieChartProps) => {
  return (
    <PieChart width={450} height={220}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        innerRadius={50}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={colors[index % colors.length]} 
            stroke="rgba(0,0,0,0.3)"
          />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="right"
        wrapperStyle={{ right: 10, top: 0, fontSize: '12px' }}
      />
    </PieChart>
  );
};

export default BusinessSizePieChart;
