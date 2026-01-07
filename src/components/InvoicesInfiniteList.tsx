import { ActivityIndicator, FlatList, View } from 'react-native';
import { ListItem } from '../components/ListItem';
import { useInvoicesInfinite } from '../hooks/useInvoicesInfiniteList';

type Overdue = 'Overdue';
type Draft = 'Draft';

export const InvoicesInfiniteList = () => {
  const { invoices, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, refetch } =
    useInvoicesInfinite();

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const getNextPageOfinvoices = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={invoices}
      renderItem={({ item }) => <ListItem invoice={item} />}
      ItemSeparatorComponent={() => (
        <View
          style={{
            width: '90%',
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            alignSelf: 'center',
            marginVertical: 10,
          }}
        />
      )}
      onEndReached={getNextPageOfinvoices}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator style={{ padding: 16 }} /> : null
      }
    />
  );
};
