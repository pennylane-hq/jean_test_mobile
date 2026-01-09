import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ExtendedInvoice, NavigationParams } from '../types';
import { Text } from '../ui';
import { ActivityIndicator } from 'react-native';
import { ListInstrumentsHeader } from '../components/ListInstrumentsHeader';
import { useInvoicesInfinite } from '../hooks/useInvoicesInfiniteList';
import { FloatingButton } from '../components/FloatingButton';
import { Layout } from '../components/Layout';
import { InvoiceListItem } from '../components/InvoiceListItem';
import { InfiniteItemsList } from '../components/InfiniteItemsList';

//NOTES
//TODO: add translations
// back end side filtering
// More complex validations
// translations
// refine styles
// add a simple style theme

//ADD debounce for searching
//TODO: overdue invoices
//TODO: add swipe to delete

//NOTE: I see that the getinvoices supports fiters,
// add filters and sorting

export const HomeScreen = () => {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    invoices,
    totalEntries,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch, //TODO: add scroll to refetch
  } = useInvoicesInfinite();

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (isError) {
    return <Text>Sorry, something went wrong</Text>;
  }

  const navigateToEditor = (params?: { invoice: ExtendedInvoice }) => {
    navigate('Editor', { invoice: params?.invoice });
  };

  return (
    <>
      <Layout
        title="Pennylane Invoice Editor"
        shouldGoBack={false}
        renderFAB={() => <FloatingButton onPress={navigateToEditor} />}>
        <Text mb="$2" color="$accent0">
          We currently have {totalEntries} invoices.
        </Text>
        <ListInstrumentsHeader
          filters={undefined}
          setFilters={() => {} /** TODO */}
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <InfiniteItemsList
          fetchNextPage={fetchNextPage}
          renderItem={({ item }) => (
            <InvoiceListItem invoice={item} onPress={() => navigateToEditor({ invoice: item })} />
          )}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          items={invoices}
        />
      </Layout>
    </>
  );
};
