import { Transaction } from '../types/payment';
import { formatCurrency } from '../utils/format';

interface TransactionItemProps {
  transaction: Transaction;
  onClick: () => void;
}

export default function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500', text: 'Completed' };
      case 'timeout': return { bg: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500', text: 'Timed Out' };
      default: return { bg: 'bg-rose-50 text-rose-600', dot: 'bg-rose-500', text: 'Failed' };
    }
  };

  const config = getStatusConfig(transaction.status);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-100 hover:shadow-sm text-left group active:scale-[0.99]"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white relative overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
          <span className="text-[10px] font-black uppercase tracking-tighter relative z-10">
            {transaction.cardType !== 'unknown' ? transaction.cardType.slice(0, 3) : 'CRD'}
          </span>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
            •••• {transaction.last4}
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 ${config.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
              {config.text}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            {new Date(transaction.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[15px] font-black text-slate-900 tracking-tight">
          {formatCurrency(transaction.amount, transaction.currency)}
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
          {transaction.currency}
        </div>
      </div>
    </button>
  );
}
