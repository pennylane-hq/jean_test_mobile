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
}: Components.Schemas.InvoiceLineCreatePayload) => {
  const vatAmount = percentOf(price || 0, vat_rate || 0);
  const resultedVatAnount = vatAmount || 0;

  //TODO: check calculations, not sure whether tax should be included
  const totalTax = checkNumber(tax) + resultedVatAnount;
  const totalPrice = checkNumber(price) * checkNumber(quantity);

  const totalSum = totalPrice + totalTax;
  return { sum: roundTo4DP(totalSum), tax: totalPrice };
};
