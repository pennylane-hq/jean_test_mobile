import { ActivityIndicator, FlatList } from 'react-native';
import { Separator } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from './AppHeader';
import { JSX } from 'react';

type Overdue = 'Overdue';
type Draft = 'Draft';

type InvoicesInfiniteListProps<T> = {
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  items: T[] | undefined;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  fetchNextPage?: () => void;
};
export const InfiniteItemsList = <T,>({
  items,
  isFetchingNextPage,
  isLoading,
  hasNextPage,
  fetchNextPage,
  renderItem,
}: InvoicesInfiniteListProps<T>) => {
  const insects = useSafeAreaInsets();

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const getNextPageOfinvoices = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Separator my={15} borderColor="$accent1" />}
      onEndReached={getNextPageOfinvoices}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Separator my={'$2'} borderBottomWidth={0} />}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator style={{ padding: 16 }} /> : null
      }
      contentContainerStyle={{ paddingBottom: insects.bottom + HEADER_HEIGHT }}
    />
  );
};
