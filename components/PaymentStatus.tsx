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
      title: retryCount > 0 ? `Retrying (Attempt ${retryCount + 1}/3)` : 'Processing Payment',
      description: 'Please do not refresh the page or close the window.',
      icon: 'bg-blue-500 animate-pulse',
      btnText: null,
      action: null
    },
    success: {
      title: 'Payment Successful',
      description: 'Your transaction has been completed successfully.',
      icon: 'bg-green-500',
      btnText: 'Done',
      action: () => setStatus('idle')
    },
    failed: {
      title: 'Payment Failed',
      description: retryCount < 2 ? 'Your transaction was declined. You can try again.' : 'Transaction declined after 3 attempts.',
      icon: 'bg-red-500',
      btnText: retryCount < 2 ? 'Retry Payment' : 'Close',
      action: retryCount < 2 ? handleRetry : () => setStatus('idle')
    },
    timeout: {
      title: 'Request Timed Out',
      description: retryCount < 2 ? 'The gateway is slow. Would you like to retry?' : 'Request timed out after 3 attempts.',
      icon: 'bg-amber-500',
      btnText: retryCount < 2 ? 'Retry Payment' : 'Close',
      action: retryCount < 2 ? handleRetry : () => setStatus('idle')
    },
    error: {
      title: 'Network Error',
      description: 'Please check your connection and try again.',
      icon: 'bg-gray-500',
      btnText: 'Close',
      action: () => setStatus('idle')
    }
  };

  const current = config[status as keyof typeof config];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${current.icon}`}>
          {status === 'processing' && <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />}
          {status === 'success' && <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
          {(status === 'failed' || status === 'error' || status === 'timeout') && <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>}
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{current.title}</h3>
          <p className="text-gray-500 mt-2">{current.description}</p>
          {status === 'processing' && retryCount > 0 && (
             <p className="text-xs text-blue-600 font-medium mt-2">Attempt {retryCount + 1} of 3</p>
          )}
        </div>

        {current.btnText && (
          <button
            onClick={current.action!}
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            {current.btnText}
          </button>
        )}
      </div>
    </div>
  );
}
