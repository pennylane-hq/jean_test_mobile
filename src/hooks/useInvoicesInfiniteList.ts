import { useInfiniteQuery } from '@tanstack/react-query';
import { useApi } from '../api';
import { ExtendedInvoice } from '../types';
import { QUERY_KEYS } from '../constants';

const PAGE_SIZE = 2;

export function useInvoicesInfinite(filter?: string) {
  const api = useApi();

  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.Invoices],
    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      const res = await api.getInvoices({ page: pageParam, per_page: PAGE_SIZE, filter });
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
    totalEntries: query?.data?.pages?.[0].pagination.total_entries,
  };
}
