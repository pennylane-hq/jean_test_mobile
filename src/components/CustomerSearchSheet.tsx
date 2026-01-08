import React, { useState } from 'react';
import { Components } from '../api/generated/client';
import { Text, Sheet } from '../ui';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, YStack } from 'tamagui';
import { SearchBar } from './SearchBar';

// hooks/useInvoices.ts
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../api';
import { InfiniteItemsList } from './InfiniteItemsList';
import { CustomerListItem } from './CustomerListItem';

type CustomerSearchSheetType = {
  open: boolean;
  toggleModal: () => void;
  setCustomer: (form: Components.Schemas.Customer) => void;
};

export function useSearchCustomers(query: string | undefined) {
  const api = useApi();

  // TODO: can be enhanced using pagination, but since there are only so many customers, skipping it
  return useQuery({
    queryKey: ['customers', query],
    queryFn: async () => {
      const res = await api.getSearchCustomers({ query });
      return res.data;
    },
  });
}

export const CustomerSearchSheet = ({
  open,
  toggleModal,
  setCustomer,
}: CustomerSearchSheetType) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useSearchCustomers(searchQuery);

  const handleSelectCustomer = (item: Components.Schemas.Customer) => {
    setCustomer(item);
    toggleModal();
  };
  return (
    <Sheet open={open} animation="medium">
      <Sheet.Overlay opacity={40} bg="$shadow4" />
      <Sheet.Frame bg="$background" p="$4">
        <MaterialIcons name="close" size={30} color={theme.accent1.get()} onPress={toggleModal} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <InfiniteItemsList
          items={data?.customers}
          renderItem={({ item }) => (
            <CustomerListItem customer={item} onPress={() => handleSelectCustomer(item)} />
          )}
          isLoading={isLoading}
          hasNextPage={false}
          isFetchingNextPage={false}
        />
      </Sheet.Frame>
    </Sheet>
  );
};
