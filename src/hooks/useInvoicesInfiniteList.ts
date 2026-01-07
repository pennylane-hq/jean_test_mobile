import { useInfiniteQuery } from '@tanstack/react-query';
import { Paths } from '../api/generated/client';
import { useApi } from '../api';
import { ExtendedInvoice } from '../types';

const PAGE_SIZE = 2;

export function useInvoicesInfinite() {
  const api = useApi();

  const query = useInfiniteQuery({
    queryKey: ['invoices'],
    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      const res = await api.getInvoices({ page: pageParam, per_page: PAGE_SIZE });
      console.log('page', res?.data);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.invoices?.length || lastPage.invoices.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const invoices: ExtendedInvoice[] =
    query.data?.pages.flatMap((page) => page?.invoices ?? []) ?? [];

  return {
    ...query,
    invoices,
  };
}
