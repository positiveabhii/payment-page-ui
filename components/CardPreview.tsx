'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePaymentStore } from '../store/usePaymentStore';
import { detectCardType } from '../utils/validation';
import { maskCardNumber } from '../utils/format';

export default function CardPreview() {
  const { formData } = usePaymentStore();
  const [isFlipped, setIsFlipped] = useState(false);
  const cardType = detectCardType(formData.cardNumber);

  const displayCardNumber = (num: string) => {
    if (!num) return '•••• •••• •••• ••••';
    return maskCardNumber(num);
  };

  return (
    <motion.div
      className="relative w-full max-w-[420px] mx-auto perspective-1000 cursor-pointer group mb-8"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="relative w-full aspect-[1.586/1]"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          mass: 1
        }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[24px] overflow-hidden card-gradient text-white shadow-2xl p-8 flex flex-col justify-between premium-shadow border border-white/10">
          <div className="absolute top-0 right-0 p-24 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <div className="w-64 h-64 rounded-full border-[12px] border-white" />
          </div>
          <div className="absolute bottom-0 left-0 p-16 opacity-5 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
            <div className="w-48 h-48 rounded-full bg-white" />
          </div>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(110deg,transparent_25%,#fff_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_3s_infinite_linear] pointer-events-none" />

          <div className="flex justify-between items-start relative z-10">
            <div className="w-14 h-10 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 rounded-lg shadow-inner relative flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-4 gap-0.5 w-full h-full p-1 opacity-40">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-t border-black/20" />
                ))}
              </div>
              <div className="absolute inset-0 bg-white/20 blur-sm"></div>
            </div>

            <div className="flex flex-col items-end">
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 glass-morphism ${cardType !== 'unknown' ? 'opacity-100' : 'opacity-0'}`}>
                {cardType}
              </div>
              {cardType === 'visa' && <div className="mt-2 text-xl italic font-black text-white/90">VISA</div>}
              {cardType === 'mastercard' && (
                <div className="mt-2 flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                  <div className="w-8 h-8 rounded-full bg-amber-500/80"></div>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="text-xl sm:text-2xl tracking-[0.25em] font-mono drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] transition-all flex justify-between">
              {displayCardNumber(formData.cardNumber).split(' ').map((part, i) => (
                <span key={i} className="inline-block">{part}</span>
              ))}
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[9px] uppercase text-white/50 font-bold tracking-[0.1em]">Card Holder</p>
                <p className="text-sm font-bold uppercase tracking-widest truncate max-w-[180px] drop-shadow-md">
                  {formData.cardholderName || 'Card Holder'}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[9px] uppercase text-white/50 font-bold tracking-[0.1em]">Expires</p>
                <p className="text-sm font-bold tracking-widest drop-shadow-md font-mono">
                  {formData.expiry || '00/00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-[24px] overflow-hidden card-gradient text-white shadow-2xl premium-shadow border border-white/10 card-face-fix"
          style={{ transform: 'rotateY(180deg) translateZ(2px)' }}
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="absolute top-6 left-0 w-full h-10 bg-slate-900/95 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_0%,#fff_50%,transparent_100%)] animate-[shimmer_5s_infinite_linear]" />
          </div>

          <div className="absolute top-20 left-8 right-8">
            <div className="flex justify-between mb-1">
              <span className="text-[7px] uppercase tracking-[0.18em] text-white/35 font-bold">
                Authorized Signature
              </span>
              <span className="text-[7px] uppercase tracking-[0.18em] text-white/35 font-bold">
                CVV
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex-1 h-9 bg-slate-100 rounded-l relative overflow-hidden flex items-center px-3">
                <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(-45deg,#cfcfcf,#cfcfcf_1px,transparent_1px,transparent_10px)]" />
                <span className="relative z-10 text-[8px] italic text-slate-400 font-mono">
                  Not valid without signature
                </span>
              </div>

              <div className="w-14 h-9 bg-white rounded-r flex items-center justify-center">
                <span className="text-slate-900 text-xs font-bold font-mono">
                  {formData.cvv ? `•${formData.cvv}` : '•••'}
                </span>
              </div>
            </div>
          </div>

          <p className="absolute top-[145px] left-8 max-w-[68%] text-[6px] leading-tight uppercase text-white/20 tracking-tight">
            This card is issued by your financial institution pursuant to license.
            Use of this card is subject to customer agreement terms.
          </p>

          <p className="absolute top-[188px] left-8 text-[10px] font-mono tracking-[0.22em] text-white/45">
            •••• •••• •••• {formData.cardNumber.replace(/\s/g, '').slice(-4) || '4242'}
          </p>

          <div className="absolute bottom-7 left-8 right-8 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 opacity-25">
                <div className="w-3 h-3 rounded-full border border-white/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <span className="text-[7px] uppercase tracking-[0.18em] font-bold">
                  Secure Network
                </span>
              </div>
              <p className="text-[6px] mt-1 text-white/10 tracking-wide">
                ENCRYPTED PAYMENT
              </p>
            </div>

            <div className="text-right opacity-25">
              {cardType !== 'unknown' && (
                <span className="text-xs uppercase italic font-black tracking-[0.2em]">
                  {cardType}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
