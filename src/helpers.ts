import { Components } from './api/generated/client';

export const percentOf = (value: number | string, percent: number | string) => {
  const number = Number(value);
  const isValidNumber = value !== '' && Number.isFinite(number);

  const percentNumber = Number(percent);
  const isValidPercentNumber = percent !== '' && Number.isFinite(percentNumber);

  if (!isValidNumber && !isValidPercentNumber) return undefined;

  return (number * percentNumber) / 100;
};

export const checkNumber = (value: number | string | undefined) => {
  if (!value) return 0;
  const convertedNumber = Number(value);
  const isValidTaxNumber = value !== '' && Number.isFinite(convertedNumber);
  return isValidTaxNumber ? convertedNumber : 0;
};

export function roundTo4DP(n: number) {
  return Math.round((n + Number.EPSILON) * 10000) / 10000;
}

export const calculateTotal = ({
  price,
  vat_rate,
  tax,
  quantity,
}: Partial<Components.Schemas.InvoiceLineCreatePayload>) => {
  if (!price) {
    return { sum: 0, tax: 0 };
  }

  const vatAmount = percentOf(price || 0, vat_rate || 0);
  const resultedVatAnount = vatAmount || 0;

  //TODO: check calculations, not sure whether tax should be included
  const totalTax = checkNumber(tax) + resultedVatAnount;
  const totalPrice = checkNumber(price) * checkNumber(quantity);

  const totalSum = totalPrice + totalTax;
  return { sum: roundTo4DP(totalSum), tax: totalPrice };
};

export const calculateTotalTax = ({
  tax,
  quantity,
}: Partial<Components.Schemas.InvoiceLineCreatePayload>) => {
  const checkedTax = checkNumber(tax);
  return checkedTax * checkNumber(quantity);
};

export const calculateVAT = (value: number | undefined, percentage: string | undefined) => {
  const percentageNumber = checkNumber(percentage);

  //TODO: not sure how to calculate it, assuming taking amount + tax as a base value
  if (!value || !percentageNumber) {
    return 0;
  }
  return percentOf(value, percentageNumber);
};

export const SIMPLE_DATE_REGEX_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const validateSimpleDate = (value: string | null | undefined) => {
  if (!value) return 'Due date is required';

  const input = new Date(value);
  if (isNaN(input.getTime())) return 'Invalid date';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return input >= today || 'Due date cannot be in the past';
};

export const SIMPLE_DATES_VALIDATION_RULES = {
  required: 'Due date is required',
  pattern: {
    value: SIMPLE_DATE_REGEX_PATTERN,
    message: 'Use format YYYY-MM-DD',
  },
  validate: validateSimpleDate,
};
