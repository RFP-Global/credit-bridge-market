
import { TableRow, TableCell } from "@/components/ui/table";

const EmptyTableRow = () => {
  return (
    <TableRow className="border-none">
      <TableCell colSpan={14} className="text-center py-10 text-gray-400 border-none">
        No results found. Try adjusting your filters.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
