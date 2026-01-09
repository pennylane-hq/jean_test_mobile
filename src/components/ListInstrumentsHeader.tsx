import React, { useState } from 'react';
import { Button, Sheet, useTheme, XStack, YStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { SearchBar, SearchBarProps } from './SearchBar';

type ListInstrumentsHeaderType = SearchBarProps & {
  filters: any; //todo: provide type when it's clear which
  setFilters: () => void;
};
export const ListInstrumentsHeader = ({
  filters,
  setFilters,
  ...props
}: ListInstrumentsHeaderType) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    if (open) setOpen(false);
    else {
      setOpen(true);
    }
  };
  return (
    <>
      <XStack
        gap="$3"
        justify="space-between"
        style={{ width: '100%', alignItems: 'center' }}
        py="$2"
        mb="$4"
        borderBottomColor="$accent1"
        borderBottomWidth="$0.5">
        <YStack style={{ width: '90%' }}>
          <SearchBar {...props} />
        </YStack>
        <MaterialIcons
          name="filter-alt"
          size={30}
          color={theme.accent1.get()}
          onPress={toggleModal}
        />
      </XStack>
      <Sheet open={open}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
          <Button onPress={toggleModal}>Close</Button>
          <Text>Filters</Text>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
