
import { TableRow, TableCell } from "@/components/ui/table";

const EmptyTableRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={14} className="text-center py-10 text-gray-400">
        No results found. Try adjusting your filters.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
