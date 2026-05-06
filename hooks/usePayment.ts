import { usePaymentStore } from '../store/usePaymentStore';

export const usePayment = () => {
  const { status, setStatus, addTransaction } = usePaymentStore();

  const processPayment = async (data: any) => {
    setStatus('processing');
    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return {
    status,
    processPayment,
  };
};
