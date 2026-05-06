'use client';

import { usePaymentStore } from '../store/usePaymentStore';
import { detectCardType } from '../utils/validation';
import { maskCardNumber } from '../utils/format';

export default function CardPreview() {
  const { formData } = usePaymentStore();
  const cardType = detectCardType(formData.cardNumber);

  const displayCardNumber = (num: string) => {
    if (!num) return '•••• •••• •••• ••••';
    return maskCardNumber(num);
  };

  return (
    <div className="relative overflow-hidden p-4 border rounded-2xl bg-slate-900 text-white shadow-2xl aspect-[1.586/1] flex flex-col justify-between transition-all duration-500">
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <div className="w-48 h-48 rounded-full border-8 border-white" />
      </div>

      <div className="flex justify-between items-start relative z-10">
        <div className="w-12 h-9 bg-amber-400/80 rounded-md shadow-inner relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_25%,#fff_50%,transparent_75%)] bg-[length:250%_100%] animate-[shimmer_2s_infinite]" />
          <div className="grid grid-cols-3 gap-0.5 w-full px-1">
            <div className="h-0.5 bg-black/20" />
            <div className="h-0.5 bg-black/20" />
            <div className="h-0.5 bg-black/20" />
          </div>
        </div>
        <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${cardType !== 'unknown' ? 'bg-white/20' : 'bg-transparent'
          }`}>
          {cardType !== 'unknown' ? cardType : ''}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-xl sm:text-2xl tracking-[0.2em] mb-8 font-mono drop-shadow-md transition-all">
          {displayCardNumber(formData.cardNumber)}
        </div>

        <div className="flex justify-between items-end gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase opacity-50 mb-1 font-medium tracking-tighter">Card Holder</p>
            <p className="text-sm font-semibold uppercase tracking-widest truncate drop-shadow-sm">
              {formData.cardholderName || 'FULL NAME'}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase opacity-50 mb-1 font-medium tracking-tighter">Expires</p>
            <p className="text-sm font-semibold tracking-widest drop-shadow-sm font-mono">
              {formData.expiry || 'MM/YY'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
