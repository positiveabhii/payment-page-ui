'use client';

import React, { useState } from 'react';
import { usePaymentStore } from '../store/usePaymentStore';
import TransactionItem from './TransactionItem';
import TransactionDetails from './TransactionDetails';
import { Transaction } from '../types/payment';

export default function TransactionHistory() {
  const { transactions } = usePaymentStore();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return (
    <div className="p-6 border rounded-xl bg-white shadow-sm flex flex-col h-full relative animate-pulse">
      <div className="h-6 w-32 bg-gray-100 rounded mb-4" />
      <div className="space-y-4">
        <div className="h-12 bg-gray-50 rounded" />
        <div className="h-12 bg-gray-50 rounded" />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 premium-shadow border border-slate-100 flex flex-col h-full min-h-[450px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
          {transactions.length} Total
        </span>
      </div>
      
      <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">No transactions yet</p>
            <p className="text-slate-300 text-xs mt-1">Complete a payment to see it here.</p>
          </div>
        ) : (
          <div className="space-y-3 pb-2">
            {transactions.map((tx) => (
              <TransactionItem 
                key={tx.id} 
                transaction={tx} 
                onClick={() => setSelectedTx(tx)} 
              />
            ))}
          </div>
        )}
      </div>

      {selectedTx && (
        <TransactionDetails 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </div>
  );
}
