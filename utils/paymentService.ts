import { PaymentFormData, PaymentStatus, Transaction } from '../types/payment';
import { detectCardType } from './validation';

export const processPaymentRequest = async (
  formData: PaymentFormData,
  onStatusChange: (status: PaymentStatus) => void,
  addTransaction: (transaction: Transaction) => void
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  onStatusChange('processing');

  try {
    const response = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.ok) {
      onStatusChange('success');
      addTransaction({
        id: data.transactionId || crypto.randomUUID(),
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        date: new Date().toISOString(),
        status: 'completed',
        last4: formData.cardNumber.slice(-4),
        cardType: detectCardType(formData.cardNumber)
      });
    } else {
      const status = response.status === 408 ? 'timeout' : 'failed';
      onStatusChange(status);
      addTransaction({
        id: crypto.randomUUID(),
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        date: new Date().toISOString(),
        status: status === 'timeout' ? 'timeout' : 'failed',
        last4: formData.cardNumber.slice(-4),
        cardType: detectCardType(formData.cardNumber)
      });
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      onStatusChange('timeout');
    } else {
      onStatusChange('error');
    }
  }
};
