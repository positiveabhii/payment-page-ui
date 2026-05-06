export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'timeout' | 'error';
export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'failed' | 'timeout';
  last4: string;
  cardType: CardType;
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
