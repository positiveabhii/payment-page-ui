import React from 'react';
import { CardType } from '../types/payment';
import { formatCardNumber } from '../utils/format';
import { detectCardType } from '../utils/validation';

interface CardInputProps {
  value: string;
  onChange: (value: string, cardType: CardType) => void;
  onBlur: () => void;
  error: string | null;
}

export default function CardInput({ value, onChange, onBlur, error }: CardInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatCardNumber(rawValue);
    const cardType = detectCardType(formattedValue);
    onChange(formattedValue, cardType);
  };

  const getCardIcon = () => {
    const type = detectCardType(value);
    switch (type) {
      case 'visa': return 'Visa';
      case 'mastercard': return 'Mastercard';
      case 'amex': return 'Amex';
      default: return 'Card';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">Card Number</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="0000 0000 0000 0000"
          className={`w-full pl-11 pr-16 text-black py-3.5 bg-slate-50/50 border rounded-xl outline-none transition-all duration-200 ${error
              ? 'border-red-300 bg-red-50/30'
              : 'border-slate-200 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'
            }`}
          maxLength={19}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <div className="px-2 py-1 bg-slate-200/50 rounded text-[9px] font-black text-slate-500 uppercase tracking-tighter">
            {getCardIcon()}
          </div>
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
