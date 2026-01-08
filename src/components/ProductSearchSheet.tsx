import React, { useEffect, useState } from 'react';
import { Components } from '../api/generated/client';
import { Text, Sheet } from '../ui';
import { MaterialIcons } from '@expo/vector-icons';
import { ListItem, useTheme, XStack, YStack } from 'tamagui';
import { SearchBar } from './SearchBar';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../api';
import { InfiniteItemsList } from './InfiniteItemsList';
import { InvoiceLineForm } from '../components/InvoiceLineForm';

type ProductSearchSheetType = {
  open: boolean;
  toggleModal: () => void;
  setInvoiceLine: (form: Components.Schemas.InvoiceLineCreatePayload) => void;
};

export function useSearchProducts(query: string | undefined) {
  const api = useApi();
  const theme = useTheme();
  // TODO: can be enhanced using pagination, but since there are only so many customers, skipping it
  return useQuery({
    queryKey: ['customers', query],
    queryFn: async () => {
      const res = await api.getSearchProducts({ query });
      return res.data;
    },
  });
}

export const ProductSearchSheet = ({
  open,
  toggleModal,
  setInvoiceLine,
}: ProductSearchSheetType) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [product, setSelectedProduct] = useState<Components.Schemas.Product>();

  const { data, isLoading } = useSearchProducts(searchQuery);

  useEffect(() => {
    if (open) {
      setSearchQuery('');
    }
  }, [open]);

  return (
    <Sheet open={open} animation="medium">
      <Sheet.Overlay opacity={40} bg="$shadow4" />
      <Sheet.Frame bg="$background" p="$4">
        <XStack justify={'flex-end'} mb="$4">
          <MaterialIcons name="close" size={30} color={theme.accent1.get()} onPress={toggleModal} />
        </XStack>
        {!product ? (
          <>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <InfiniteItemsList
              items={data?.products}
              renderItem={({ item }) => (
                <YStack
                  onPress={() => {
                    setSelectedProduct(item);
                  }}>
                  <Text color="black">{item?.label}</Text>
                </YStack>
              )}
              isLoading={isLoading}
              hasNextPage={false}
              isFetchingNextPage={false}
            />
          </>
        ) : (
          <>
            <ListItem
              title="Selected product"
              subTitle={product.label}
              bg={'transparent'}
              borderColor={'$accent1'}
              borderWidth={'$1'}
              style={{ borderRadius: 8 }}
              icon={<MaterialIcons name="find-replace" size={22} color={theme.accent1.get()} />}
              onPress={() => setSelectedProduct(undefined)}
            />
            <InvoiceLineForm
              setInvoiceLine={setInvoiceLine}
              product={product}
              onClose={toggleModal}
            />
          </>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};
