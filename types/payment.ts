export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'failed';
  last4: string;
}

export interface PaymentState {
  status: PaymentStatus;
  transactions: Transaction[];
  setStatus: (status: PaymentStatus) => void;
  addTransaction: (transaction: Transaction) => void;
}
