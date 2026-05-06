export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const maskCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/\d(?=\d{4})/g, '•');
};

export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
};

export const currencies = [
  { code: 'USD', name: 'United States', flag: '🇺🇸' },
  { code: 'INR', name: 'India', flag: '🇮🇳' },
  { code: 'EUR', name: 'Europe', flag: '🇪🇺' },
  { code: 'GBP', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japan', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canada', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australia', flag: '🇦🇺' },
  { code: 'SGD', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AED', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'CHF', name: 'Switzerland', flag: '🇨🇭' },
];
