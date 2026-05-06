'use client';

import { usePaymentStore } from '../store/usePaymentStore';
import { formatCurrency } from '../utils/format';

export default function TransactionHistory() {
  const { transactions } = usePaymentStore();

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
      <div className="space-y-4 overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm italic">
            No transactions yet
          </div>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0 border-gray-50 group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] uppercase ${
                  tx.status === 'completed' ? 'bg-green-500' : tx.status === 'timeout' ? 'bg-amber-500' : 'bg-red-500'
                }`}>
                  {tx.cardType !== 'unknown' ? tx.cardType.slice(0, 2) : '??'}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">•••• {tx.last4}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
                    {new Date(tx.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(tx.amount, tx.currency)}
                </div>
                <div className={`text-[10px] font-bold uppercase ${
                  tx.status === 'completed' ? 'text-green-600' : tx.status === 'timeout' ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
