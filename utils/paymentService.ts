import { PaymentFormData, PaymentStatus, Transaction } from '../types/payment';
import { detectCardType } from './validation';

export const processPaymentRequest = async (
  formData: PaymentFormData,
  onStatusChange: (status: PaymentStatus) => void,
  addOrUpdateTransaction: (transaction: Transaction, isUpdate: boolean) => void,
  existingTransactionId?: string | null
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  const transactionId = existingTransactionId || crypto.randomUUID();
  const isUpdate = !!existingTransactionId;

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
      addOrUpdateTransaction({
        id: transactionId,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        date: new Date().toISOString(),
        status: 'completed',
        last4: formData.cardNumber.slice(-4),
        cardType: detectCardType(formData.cardNumber)
      }, isUpdate);
    } else {
      const status = response.status === 408 ? 'timeout' : 'failed';
      onStatusChange(status);
      addOrUpdateTransaction({
        id: transactionId,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        date: new Date().toISOString(),
        status: status === 'timeout' ? 'timeout' : 'failed',
        last4: formData.cardNumber.slice(-4),
        cardType: detectCardType(formData.cardNumber)
      }, isUpdate);
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    const status = error.name === 'AbortError' ? 'timeout' : 'error';
    onStatusChange(status);
    
    if (status !== 'error') {
      addOrUpdateTransaction({
        id: transactionId,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        date: new Date().toISOString(),
        status: status === 'timeout' ? 'timeout' : 'failed',
        last4: formData.cardNumber.slice(-4),
        cardType: detectCardType(formData.cardNumber)
      }, isUpdate);
    }
  }

  return transactionId;
};
