import React from 'react';
import { currencies } from '../utils/format';

interface AmountInputProps {
  amount: string;
  currency: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onBlur: () => void;
  error: string | null;
}

export default function AmountInput({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  onBlur,
  error,
}: AmountInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">Amount</label>
      <div className="flex gap-3">
        <div className="relative group min-w-[110px]">
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5 transition-all cursor-pointer font-bold text-slate-700"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 group-focus-within:text-brand-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative group flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary font-bold">
            {currencies.find(c => c.code === currency)?.symbol || '$'}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            onBlur={onBlur}
            placeholder="0.00"
            step="0.01"
            className={`w-full text-black pl-10 pr-4 py-3.5 bg-slate-50/50 border rounded-xl outline-none transition-all duration-200 font-bold text-slate-800 ${
              error 
                ? 'border-red-300 bg-red-50/30' 
                : 'border-slate-200 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'
            }`}
          />
        </div>
      </div>
      {error && (
        <p className="text-[11px] font-medium text-red-500 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
          <span className="w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
}
