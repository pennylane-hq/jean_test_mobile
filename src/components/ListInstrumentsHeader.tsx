import React, { useState } from 'react';
import { Button, Sheet, useTheme, XStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

type ListInstrumentsHeaderType = {
  filters: any; //todo: provide type when it's clear which
  setFilters: () => void;
};
export const ListInstrumentsHeader = ({ filters, setFilters }: ListInstrumentsHeaderType) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigateToSearchScreen = () => {};
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
        justify={'flex-end'}
        style={{ width: '100%' }}
        py="$2"
        borderBottomColor={'$accent1'}
        borderBottomWidth={'$0.5'}>
        <MaterialIcons
          name="filter-alt"
          size={30}
          color={theme.accent1.get()}
          onPress={toggleModal}
        />
        <MaterialIcons
          name="search"
          size={30}
          color={theme.accent1.get()}
          onPress={navigateToSearchScreen}
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
