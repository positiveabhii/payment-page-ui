import { create } from 'zustand';
import { PaymentState, PaymentStatus, Transaction } from '../types/payment';

export const usePaymentStore = create<PaymentState>((set) => ({
  status: 'idle',
  transactions: [],
  formData: {
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: '',
    currency: 'USD',
  },
  retryCount: 0,
  currentTransactionId: null,
  setStatus: (status: PaymentStatus) => set({ status }),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  incrementRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),
  resetRetry: () => set({ retryCount: 0, currentTransactionId: null }),
  setTransactionId: (id) => set({ currentTransactionId: id }),
}));
