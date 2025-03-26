
import { TableRow, TableCell } from "@/components/ui/table";

const EmptyTableRow = () => {
  return (
    <TableRow className="bg-transparent">
      <TableCell colSpan={14} className="text-center py-10 text-gray-400 bg-black/10 backdrop-blur-sm">
        No results found. Try adjusting your filters.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
