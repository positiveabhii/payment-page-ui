'use client';

import { usePaymentStore } from '../store/usePaymentStore';
import { detectCardType } from '../utils/validation';

export default function CardPreview() {
  const { formData } = usePaymentStore();
  const cardType = detectCardType(formData.cardNumber);

  const formatCardNumberDisplay = (num: string) => {
    return num || '•••• •••• •••• ••••';
  };

  return (
    <div className="p-6 border rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg aspect-[1.586/1] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="w-12 h-8 bg-gray-700/50 rounded flex items-center justify-center text-[10px] font-bold">
          CHIP
        </div>
        <div className="text-sm font-medium opacity-80 italic uppercase">
          {cardType !== 'unknown' ? cardType : 'VISA'}
        </div>
      </div>
      <div>
        <div className="text-xl tracking-widest mb-4 font-mono">
          {formatCardNumberDisplay(formData.cardNumber)}
        </div>
        <div className="flex justify-between items-end">
          <div className="flex-1 mr-4 overflow-hidden">
            <div className="text-[10px] uppercase opacity-60 mb-1">Card Holder</div>
            <div className="text-sm font-medium uppercase tracking-wider truncate">
              {formData.cardholderName || 'Your Name'}
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[10px] uppercase opacity-60 mb-1">Expires</div>
            <div className="text-sm font-medium tracking-wider">
              {formData.expiry || 'MM/YY'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
