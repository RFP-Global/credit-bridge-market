
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HistoricalTransaction } from "@/data/transactionArchiveData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, DollarSign, MapPin } from "lucide-react";

interface TransactionHistoryTableProps {
  transactions: HistoricalTransaction[];
}

const TransactionHistoryTable = ({ transactions }: TransactionHistoryTableProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortField, setSortField] = useState<keyof HistoricalTransaction | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof HistoricalTransaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA === fieldB) return 0;
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === "asc" 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }
    
    if (fieldA && fieldB && sortField === 'location') {
      const cityA = (a.location?.city || '').toString();
      const cityB = (b.location?.city || '').toString();
      return sortDirection === "asc" 
        ? cityA.localeCompare(cityB) 
        : cityB.localeCompare(cityA);
    }
    
    if (sortField === 'completionDate') {
      const dateA = new Date(a.completionDate || '');
      const dateB = new Date(b.completionDate || '');
      return sortDirection === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    }
    
    return 0;
  });

  const handleRowClick = (transaction: HistoricalTransaction, index: number) => {
    navigate(`/transaction-details/${transaction.id}`, { 
      state: { 
        projectIndex: index,
        from: location.pathname
      } 
    });
  };
  
  const getSortIcon = (field: keyof HistoricalTransaction) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const getProjectName = (index: number) => {
    const projectLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return `Project ${projectLetters[index % projectLetters.length]}`;
  };

  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900/50">
          <TableRow className="hover:bg-gray-800/50 border-gray-700">
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('companyName')}
            >
              Project {getSortIcon('companyName')}
            </TableHead>
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('industry')}
            >
              Industry {getSortIcon('industry')}
            </TableHead>
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('businessType')}
            >
              Business Type {getSortIcon('businessType')}
            </TableHead>
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('principal')}
            >
              Amount {getSortIcon('principal')}
            </TableHead>
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('facilityType')}
            >
              Facility {getSortIcon('facilityType')}
            </TableHead>
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('location')}
            >
              Location {getSortIcon('location')}
            </TableHead>
            <TableHead 
              className="text-cyan-300 cursor-pointer" 
              onClick={() => handleSort('completionDate')}
            >
              Completion Date {getSortIcon('completionDate')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction, index) => (
            <TableRow 
              key={transaction.id} 
              className="hover:bg-gray-800/30 border-gray-700 cursor-pointer"
              onClick={() => handleRowClick(transaction, index)}
            >
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-cyan-400" />
                  <span>{getProjectName(index)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-cyan-900/20 text-cyan-300 border border-cyan-700/30">
                  {transaction.industry}
                </Badge>
                {transaction.subSector && (
                  <div className="text-xs text-gray-400 mt-1">
                    {transaction.subSector}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {transaction.businessType}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-cyan-400" />
                  <span>${transaction.principal.toLocaleString()}</span>
                </div>
              </TableCell>
              <TableCell>
                {transaction.facilityType}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <span>{`${transaction.location.city}, ${transaction.location.state}`}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <span>{new Date(transaction.completionDate).toLocaleDateString()}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistoryTable;
