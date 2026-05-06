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
  setStatus: (status: PaymentStatus) => set({ status }),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
