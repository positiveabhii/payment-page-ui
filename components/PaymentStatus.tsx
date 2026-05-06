'use client';

import { usePaymentStore } from '../store/usePaymentStore';

export default function PaymentStatus() {
  const { status, setStatus } = usePaymentStore();

  if (status === 'idle') return null;

  const config = {
    processing: {
      title: 'Processing Payment',
      description: 'Please do not refresh the page or close the window.',
      icon: 'bg-blue-500 animate-pulse',
      btnText: null
    },
    success: {
      title: 'Payment Successful',
      description: 'Your transaction has been completed successfully.',
      icon: 'bg-green-500',
      btnText: 'Done'
    },
    failed: {
      title: 'Payment Failed',
      description: 'Your transaction was declined. Please try again.',
      icon: 'bg-red-500',
      btnText: 'Try Again'
    },
    timeout: {
      title: 'Request Timed Out',
      description: 'The payment gateway is taking too long to respond.',
      icon: 'bg-amber-500',
      btnText: 'Retry'
    },
    error: {
      title: 'Network Error',
      description: 'Please check your connection and try again.',
      icon: 'bg-gray-500',
      btnText: 'Close'
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
        </div>

        {current.btnText && (
          <button
            onClick={() => setStatus('idle')}
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            {current.btnText}
          </button>
        )}
      </div>
    </div>
  );
}
