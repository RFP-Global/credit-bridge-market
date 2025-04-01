
import { Table, TableBody } from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import ProposalTableRow from "./ProposalTableRow";
import EmptyTableRow from "./EmptyTableRow";

interface TableContentProps {
  proposals: FinanceProposal[];
  onViewDetails: (id: string) => void;
}

const TableContent = ({ proposals, onViewDetails }: TableContentProps) => {
  return (
    <div className="rounded-sm overflow-hidden border-0">
      <Table>
        <TableBody>
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <ProposalTableRow 
                key={proposal.id}
                proposal={proposal} 
                onViewDetails={onViewDetails} 
              />
            ))
          ) : (
            <EmptyTableRow />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableContent;
