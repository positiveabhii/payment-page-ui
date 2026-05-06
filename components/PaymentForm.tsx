'use client';

import React, { useState, useMemo } from 'react';
import CardInput from './CardInput';
import AmountInput from './AmountInput';
import { usePaymentStore } from '../store/usePaymentStore';
import { PaymentFormData } from '../types/payment';
import { processPaymentRequest } from '../utils/paymentService';
import {
  validateCardholderName,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateAmount,
  detectCardType
} from '../utils/validation';

export default function PaymentForm() {
  const {
    status,
    setStatus,
    formData,
    updateFormData,
    addTransaction,
    updateTransaction,
    resetRetry,
    setTransactionId
  } = usePaymentStore();

  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PaymentFormData, boolean>>>({});

  const cardType = useMemo(() => detectCardType(formData.cardNumber), [formData.cardNumber]);

  const validateField = (name: keyof PaymentFormData, value: string) => {
    let error: string | null = null;
    switch (name) {
      case 'cardholderName': error = validateCardholderName(value); break;
      case 'cardNumber': error = validateCardNumber(value); break;
      case 'expiry': error = validateExpiry(value); break;
      case 'cvv': error = validateCVV(value, cardType); break;
      case 'amount': error = validateAmount(value); break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (name: keyof PaymentFormData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const handleChange = (name: keyof PaymentFormData, value: string) => {
    updateFormData({ [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      !validateCardholderName(formData.cardholderName) &&
      !validateCardNumber(formData.cardNumber) &&
      !validateExpiry(formData.expiry) &&
      !validateCVV(formData.cvv, cardType) &&
      !validateAmount(formData.amount)
    );
  }, [formData, cardType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || status === 'processing') return;

    resetRetry();
    const txId = await processPaymentRequest(
      formData,
      setStatus,
      (tx, isUpdate) => isUpdate ? updateTransaction(tx) : addTransaction(tx)
    );
    setTransactionId(txId);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 premium-shadow border border-slate-100 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Payment Details</h2>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-brand-primary/20"></div>
          <div className="w-2 h-2 rounded-full bg-brand-primary/40"></div>
          <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">Cardholder Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              value={formData.cardholderName}
              onChange={(e) => handleChange('cardholderName', e.target.value)}
              onBlur={() => handleBlur('cardholderName')}
              placeholder="Enter full name"
              className={`w-full pl-11 pr-4 py-3.5 bg-slate-50/50 text-black border rounded-xl outline-none transition-all duration-200 ${touched.cardholderName && errors.cardholderName
                ? 'border-red-300 bg-red-50/30'
                : 'border-slate-200 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'
                }`}
            />
          </div>
          {touched.cardholderName && errors.cardholderName && (
            <p className="text-[11px] font-medium text-red-500 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
              <span className="w-1 h-1 rounded-full bg-red-500"></span>
              {errors.cardholderName}
            </p>
          )}
        </div>

        <CardInput
          value={formData.cardNumber}
          onChange={(val) => handleChange('cardNumber', val)}
          onBlur={() => handleBlur('cardNumber')}
          error={touched.cardNumber ? errors.cardNumber || null : null}
        />

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">Expiry Date</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="text"
                value={formData.expiry}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, '');
                  if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                  handleChange('expiry', val);
                }}
                onBlur={() => handleBlur('expiry')}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full pl-11 text-black pr-4 py-3.5 bg-slate-50/50 border rounded-xl outline-none transition-all duration-200 ${touched.expiry && errors.expiry
                  ? 'border-red-300 bg-red-50/30'
                  : 'border-slate-200 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'
                  }`}
              />
            </div>
            {touched.expiry && errors.expiry && (
              <p className="text-[11px] font-medium text-red-500 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {errors.expiry}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-500 ml-1 uppercase tracking-wider">CVV</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={formData.cvv}
                onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, ''))}
                onBlur={() => handleBlur('cvv')}
                placeholder={cardType === 'amex' ? '0000' : '000'}
                maxLength={cardType === 'amex' ? 4 : 3}
                className={`w-full pl-11 text-black pr-4 py-3.5 bg-slate-50/50 border rounded-xl outline-none transition-all duration-200 ${touched.cvv && errors.cvv
                  ? 'border-red-300 bg-red-50/30'
                  : 'border-slate-200 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'
                  }`}
              />
            </div>
            {touched.cvv && errors.cvv && (
              <p className="text-[11px] font-medium text-red-500 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        <AmountInput
          amount={formData.amount}
          currency={formData.currency}
          onAmountChange={(val) => handleChange('amount', val)}
          onCurrencyChange={(val) => handleChange('currency', val)}
          onBlur={() => handleBlur('amount')}
          error={touched.amount ? errors.amount || null : null}
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid || status === 'processing'}
        className="group relative w-full py-4 bg-slate-900 overflow-hidden text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99] mt-2 shadow-lg shadow-slate-900/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === 'processing' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Complete Payment
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </span>
      </button>

      <div className="pt-4 flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
        <div className="h-6 w-10 bg-slate-200 rounded"></div>
        <div className="h-6 w-10 bg-slate-200 rounded"></div>
        <div className="h-6 w-10 bg-slate-200 rounded"></div>
      </div>
    </form>
  );
}
