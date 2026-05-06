'use client';

import React, { useState, useMemo } from 'react';
import CardInput from './CardInput';
import AmountInput from './AmountInput';
import { usePaymentStore } from '../store/usePaymentStore';
import { CardType, PaymentFormData } from '../types/payment';
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
  const { status, setStatus, formData, updateFormData, addTransaction } = usePaymentStore();

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

    await processPaymentRequest(formData, setStatus, addTransaction);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-xl bg-white shadow-sm space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
        <input
          type="text"
          value={formData.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
          onBlur={() => handleBlur('cardholderName')}
          placeholder="John Doe"
          className={`px-4 py-2.5 bg-white border rounded-lg outline-none transition-all ${
            touched.cardholderName && errors.cardholderName ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
        />
        {touched.cardholderName && errors.cardholderName && (
          <span className="text-xs text-red-500">{errors.cardholderName}</span>
        )}
      </div>

      <CardInput
        value={formData.cardNumber}
        onChange={(val) => handleChange('cardNumber', val)}
        onBlur={() => handleBlur('cardNumber')}
        error={touched.cardNumber ? errors.cardNumber || null : null}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
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
            className={`px-4 py-2.5 bg-white border rounded-lg outline-none transition-all ${
              touched.expiry && errors.expiry ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
            }`}
          />
          {touched.expiry && errors.expiry && (
            <span className="text-xs text-red-500">{errors.expiry}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, ''))}
            onBlur={() => handleBlur('cvv')}
            placeholder={cardType === 'amex' ? '0000' : '000'}
            maxLength={cardType === 'amex' ? 4 : 3}
            className={`px-4 py-2.5 bg-white border rounded-lg outline-none transition-all ${
              touched.cvv && errors.cvv ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
            }`}
          />
          {touched.cvv && errors.cvv && (
            <span className="text-xs text-red-500">{errors.cvv}</span>
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

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full py-3.5 bg-gray-900 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-4"
      >
        Pay Now
      </button>
    </form>
  );
}
