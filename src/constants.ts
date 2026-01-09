import { Components } from './api/generated/client';

export const UNIT_VALUES = ['hour', 'day', 'piece'] as Components.Schemas.Unit[];
export const VAT_RATE_VALUES = ['0', '5.5', '10', '20'] as Components.Schemas.VatRate[];

export const enum QUERY_KEYS {
  Invoices = 'Invoices',
  Invoice = 'Invoice',
  Customers = 'Customers',
  Products = 'Products',
}
