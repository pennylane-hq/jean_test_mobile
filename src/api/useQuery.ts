import { useQuery, QueryKey } from '@tanstack/react-query';
import { Client } from './generated/client';
import { useApi } from '.';

export function useApiQuery<TResult>(key: QueryKey, fn: (api: Client) => Promise<TResult>) {
  const api = useApi();

  return useQuery({
    queryKey: key,
    queryFn: () => fn(api),
  });
}
