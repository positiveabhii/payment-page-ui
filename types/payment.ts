export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';
export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'failed';
  last4: string;
}

export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: string;
  currency: string;
}

export interface PaymentState {
  status: PaymentStatus;
  transactions: Transaction[];
  formData: PaymentFormData;
  setStatus: (status: PaymentStatus) => void;
  addTransaction: (transaction: Transaction) => void;
  updateFormData: (data: Partial<PaymentFormData>) => void;
}
