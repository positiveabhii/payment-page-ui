'use client';

import { usePaymentStore } from '../store/usePaymentStore';
import { processPaymentRequest } from '../utils/paymentService';

export default function PaymentStatus() {
  const { 
    status, 
    setStatus, 
    retryCount, 
    incrementRetry, 
    currentTransactionId, 
    formData, 
    addTransaction, 
    updateTransaction 
  } = usePaymentStore();

  if (status === 'idle') return null;

  const handleRetry = async () => {
    if (retryCount >= 2) return; // 0, 1, 2 = 3 attempts
    incrementRetry();
    await processPaymentRequest(
      formData, 
      setStatus, 
      (tx, isUpdate) => isUpdate ? updateTransaction(tx) : addTransaction(tx),
      currentTransactionId
    );
  };

  const config = {
    processing: {
      title: retryCount > 0 ? `Retrying (Attempt ${retryCount + 1}/3)` : 'Securing Payment',
      description: 'Your payment is being processed through our secure gateway. Please stay on this page.',
      theme: 'from-brand-primary to-brand-secondary',
      icon: <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />,
      btnText: null,
      action: null
    },
    success: {
      title: 'Payment Successful',
      description: 'Thank you! Your transaction has been completed. You will receive a confirmation email shortly.',
      theme: 'from-emerald-500 to-teal-600',
      icon: (
        <div className="relative">
          <div className="absolute -inset-4 bg-white/20 rounded-full animate-ping"></div>
          <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
      btnText: 'Back to Checkout',
      action: () => setStatus('idle')
    },
    failed: {
      title: 'Transaction Declined',
      description: retryCount < 2 ? 'We could not process your payment. Please verify your details or try another card.' : 'Multiple attempts failed. Please contact your bank or try a different payment method.',
      theme: 'from-rose-500 to-red-600',
      icon: <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>,
      btnText: retryCount < 2 ? 'Retry with same details' : 'Close',
      action: retryCount < 2 ? handleRetry : () => setStatus('idle')
    },
    timeout: {
      title: 'Gateway Timeout',
      description: retryCount < 2 ? 'The payment server is taking longer than expected. Would you like to try again?' : 'Maximum retries reached. The server is currently unavailable.',
      theme: 'from-amber-400 to-orange-500',
      icon: <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      btnText: retryCount < 2 ? 'Try Reconnecting' : 'Close',
      action: retryCount < 2 ? handleRetry : () => setStatus('idle')
    },
    error: {
      title: 'Connection Error',
      description: 'A network error occurred. Please check your internet connection and try again.',
      theme: 'from-slate-500 to-slate-700',
      icon: <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      btnText: 'Try Again',
      action: () => setStatus('idle')
    }
  };

  const current = config[status as keyof typeof config];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-slate-100">
        <div className={`py-12 flex flex-col items-center justify-center bg-gradient-to-br ${current.theme}`}>
          {current.icon}
        </div>

        <div className="p-10 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 leading-tight">{current.title}</h3>
            <p className="text-slate-500 text-[15px] leading-relaxed px-2">{current.description}</p>
          </div>

          {current.btnText && (
            <button
              onClick={current.action!}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-slate-900/10"
            >
              {current.btnText}
            </button>
          )}

          {status === 'processing' && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
