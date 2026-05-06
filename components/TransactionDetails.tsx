import { Transaction } from '../types/payment';
import { formatCurrency } from '../utils/format';

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionDetails({ transaction, onClose }: TransactionDetailsProps) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-slate-100">
        <div className="relative h-32 bg-slate-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary via-slate-900 to-slate-900"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 text-center">
            <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Total Amount</div>
            <div className="text-3xl font-black text-white tracking-tight">
              {formatCurrency(transaction.amount, transaction.currency)}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex justify-center -mt-12 relative z-20">
            <div className={`px-4 py-2 rounded-2xl shadow-xl border-4 border-white font-black text-xs uppercase tracking-widest ${transaction.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
              {transaction.status}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction ID</span>
              <span className="text-[11px] font-mono font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg select-all cursor-copy hover:bg-slate-200 transition-colors">
                {transaction.id}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</span>
              <span className="text-sm font-bold text-slate-700">
                {new Date(transaction.date).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Method</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-slate-900 rounded text-[7px] font-black text-white flex items-center justify-center uppercase">
                  {transaction.cardType.slice(0, 3)}
                </div>
                <span className="text-sm font-bold text-slate-700">•••• {transaction.last4}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-[0.98] mt-4"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
