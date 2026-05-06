import { Transaction } from '../types/payment';
import { formatCurrency } from '../utils/format';

interface TransactionItemProps {
  transaction: Transaction;
  onClick: () => void;
}

export default function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'timeout': return 'bg-amber-500';
      default: return 'bg-red-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'timeout': return 'text-amber-600';
      default: return 'text-red-600';
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-50 text-left group"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] uppercase ${getStatusColor(transaction.status)}`}>
          {transaction.cardType !== 'unknown' ? transaction.cardType.slice(0, 2) : '??'}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-600">•••• {transaction.last4}</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
            {new Date(transaction.date).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-gray-900">
          {formatCurrency(transaction.amount, transaction.currency)}
        </div>
        <div className={`text-[10px] font-bold uppercase ${getStatusText(transaction.status)}`}>
          {transaction.status}
        </div>
      </div>
    </button>
  );
}
