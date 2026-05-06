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
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">Amount</label>
      <div className="flex gap-2">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-24 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          onBlur={onBlur}
          placeholder="0.00"
          step="0.01"
          className={`flex-1 px-4 py-2.5 bg-white border rounded-lg outline-none transition-all ${
            error ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
