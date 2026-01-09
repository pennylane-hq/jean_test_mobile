import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { Paths } from '../api/generated/client';
import { useApi } from '../api';
import { QUERY_KEYS } from '../constants';

export function useInvoiceAPI(onSuccessNavigate?: () => void) {
  const queryClient = useQueryClient();
  const api = useApi();

  const createInvoiceMutation = useMutation({
    mutationFn: (data: Paths.PostInvoices.RequestBody) =>
      api.postInvoices(null, data).then((r) => r.data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.Invoices], refetchType: 'active' });
      console.warn('Invoice created:', data);
      onSuccessNavigate?.();
    },

    onError: (error) => {
      console.error(error);
      Alert.alert('Error');
    },
  });

  const patchInvoiceMutation = useMutation({
    mutationFn: async (data: Paths.PutInvoice.RequestBody) => {
      if (!data?.invoice?.id) {
        throw new Error();
      }
      return api.putInvoice(data.invoice.id, data).then((r) => r.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.Invoices], refetchType: 'active' });

      console.warn('Invoice updated:', data);
      onSuccessNavigate?.();
    },

    onError: (error) => {
      console.error(error);
      Alert.alert('Error');
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (invoiceId: number) => {
      if (!invoiceId) {
        throw new Error();
      }
      return api.deleteInvoice(invoiceId).then((r) => r.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.Invoices], refetchType: 'active' });

      console.warn('Invoice deleted:', data);
      onSuccessNavigate?.();
    },

    onError: (error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to delete invoice');
    },
  });

  return {
    createInvoiceMutation,
    patchInvoiceMutation,
    deleteInvoiceMutation,
  };
}
