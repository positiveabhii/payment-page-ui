import { Transaction } from '../types/payment';
import { formatCurrency } from '../utils/format';

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionDetails({ transaction, onClose }: TransactionDetailsProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center pb-6 border-b border-gray-50">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatCurrency(transaction.amount, transaction.currency)}
            </div>
            <div className={`text-xs font-bold uppercase tracking-widest ${
              transaction.status === 'completed' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.status}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <span className="text-gray-900 font-mono text-xs bg-gray-100 px-2 py-1 rounded">{transaction.id}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Date & Time</span>
              <span className="text-gray-900">{new Date(transaction.date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-900 uppercase">{transaction.cardType} •••• {transaction.last4}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
