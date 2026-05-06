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
    <div className="p-6 border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-full relative">
      <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
      
      <div className="space-y-1 overflow-y-auto pr-2 min-h-[300px]">
        {transactions.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm italic">No transactions found</p>
          </div>
        ) : (
          transactions.map((tx) => (
            <TransactionItem 
              key={tx.id} 
              transaction={tx} 
              onClick={() => setSelectedTx(tx)} 
            />
          ))
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
