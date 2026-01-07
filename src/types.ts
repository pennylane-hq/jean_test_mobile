import { Components, Paths } from './api/generated/client';

export interface NavigationParams {
  Home: undefined;
  Editor: undefined;
}

//TODO: ask openapi team to check types, seems like we need to move it as a separate one,
//so that it could be exported directly out of openapi
export type ExtendedInvoice = Paths.GetInvoices.Responses.$200['invoices'][number];

export enum UserFriendlyInvoiceStatuses {
  Unpaid = 'Unpaid',
  Paid = 'Paid',
}
