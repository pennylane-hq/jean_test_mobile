import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useApi } from '../api';
import { useState } from 'react';
import { NavigationParams } from '../types';
import { Button, H1, Text, YStack } from '../ui';
import { ActivityIndicator } from 'react-native';
import { ListInstrumentsHeader } from '../components/ListInstrumentsHeader';
import { useInvoicesInfinite } from '../hooks/useInvoicesInfiniteList';
import { InvoicesInfiniteList } from '../components/InvoicesInfiniteList';

//NOTES
//TODO: add translations
//TODO: storybook showcase can be added to the components library,
//or just readme for newbeis not to guess how the componets should look or their goal
// pagination to the list
// back end side filtering
// More complex validations

type Overdue = 'Overdue';
type Draft = 'Draft';

export const HomeScreen = () => {
  const api = useApi();
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  //NOTE: I see that the getinvoices supports fiters,
  // but no type is provided, therefore I have no idea about the format
  const { invoices, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, refetch } =
    useInvoicesInfinite();

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

  return (
    <YStack
      gap="$4"
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 16 }}>
      <H1 size="$5" fontWeight="600" color="black">
        Pennylane Invoice Editor
      </H1>
      <Text color="black">We currently have {count} invoices.</Text>
      <Button onPress={() => navigate('Editor')}>Create a new one</Button>
      <ListInstrumentsHeader
        filters={undefined}
        setFilters={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <InvoicesInfiniteList />
    </YStack>
  );
};
