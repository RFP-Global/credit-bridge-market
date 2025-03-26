
import { TableHead } from "@/components/ui/table";

interface StaticTableHeaderProps {
  title: string;
}

const StaticTableHeader = ({ title }: StaticTableHeaderProps) => {
  return (
    <TableHead className="text-center text-xs font-medium text-cyan-400 bg-black sticky top-0 z-10">
      {title}
    </TableHead>
  );
};

export default StaticTableHeader;
