import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useApi } from '../api';
import React, { useState } from 'react';
import { ExtendedInvoice, NavigationParams } from '../types';
import { Text } from '../ui';
import { ActivityIndicator } from 'react-native';
import { ListInstrumentsHeader } from '../components/ListInstrumentsHeader';
import { useInvoicesInfinite } from '../hooks/useInvoicesInfiniteList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingButton } from '../components/FloatingButton';
import { Layout } from '../components/Layout';
import { InvoiceListItem } from '../components/InvoiceListItem';
import { InfiniteItemsList } from '../components/InfiniteItemsList';
import { SearchBar } from '../components/SearchBar';
import { Components } from '../api/generated/client';

//NOTES
//TODO: add translations
//TODO: storybook showcase can be added to the components library,
//or just readme for newbeis not to guess how the componets should look or their goal
// pagination to the list
// back end side filtering
// More complex validations
// Theming
// translations
// refine styles
// add a simple style theme

type Overdue = 'Overdue';
type Draft = 'Draft';

export const HomeScreen = () => {
  const api = useApi();
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();
  const [page, setPage] = useState(1);
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isInvoiceViewerOpened, setIsInvoiceViewerOpened] = useState(false);

  //NOTE: I see that the getinvoices supports fiters,
  // add filters and sorting

  const {
    invoices,
    totalEntries,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInvoicesInfinite();

  const parseStatus = () => {};
  const getFormattedDate = () => {};

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const getNextPageOfinvoices = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const navigateToEditor = (params?: { invoice: ExtendedInvoice }) => {
    navigate('Editor', { invoice: params?.invoice });
  };

  const toggleInvoiceViewer = () => {
    if (isInvoiceViewerOpened) setIsInvoiceViewerOpened(false);
    else {
      setIsInvoiceViewerOpened(true);
    }
  };

  return (
    <>
      <Layout
        title="Pennylane Invoice Editor"
        renderFAB={() => <FloatingButton onPress={navigateToEditor} />}>
        <Text color="black">We currently have {totalEntries} invoices.</Text>
        <ListInstrumentsHeader
          filters={undefined}
          setFilters={function (): void {
            throw new Error('Function not implemented.');
          }}
        />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

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
