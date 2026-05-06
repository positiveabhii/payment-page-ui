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
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">Card Number</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="0000 0000 0000 0000"
          className={`w-full px-4 py-2.5 bg-white border rounded-lg outline-none transition-all ${
            error ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
          maxLength={19}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {getCardIcon()}
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
