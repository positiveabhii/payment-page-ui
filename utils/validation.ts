import { CardType } from '../types/payment';

export const validateCardholderName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 3) return 'Name is too short';
  return null;
};

export const validateCardNumber = (number: string): string | null => {
  const digits = number.replace(/\s/g, '');
  if (!/^\d+$/.test(digits)) return 'Card number must be digits';
  if (digits.length < 13 || digits.length > 19) return 'Invalid card number length';
  return null;
};

export const validateExpiry = (expiry: string): string | null => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Format must be MM/YY';
  
  const [month, year] = expiry.split('/').map(Number);
  if (month < 1 || month > 12) return 'Invalid month';
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Card has expired';
  }
  
  return null;
};

export const validateCVV = (cvv: string, cardType: CardType): string | null => {
  const expectedLength = cardType === 'amex' ? 4 : 3;
  if (!/^\d+$/.test(cvv)) return 'CVV must be digits';
  if (cvv.length !== expectedLength) return `CVV must be ${expectedLength} digits`;
  return null;
};

export const validateAmount = (amount: string): string | null => {
  const num = parseFloat(amount);
  if (isNaN(num)) return 'Invalid amount';
  if (num <= 0) return 'Amount must be greater than 0';
  return null;
};

export const detectCardType = (number: string): CardType => {
  const digits = number.replace(/\s/g, '');
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  return 'unknown';
};
