import React, { useState } from 'react';
import { Button, Sheet, XStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

type ListInstrumentsHeaderType = {
  filters: any; //todo: provide type when clear
  setFilters: () => void;
};
export const ListInstrumentsHeader = ({ filters, setFilters }: ListInstrumentsHeaderType) => {
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
        style={{ justifyContent: 'flex-end', width: '100%', backgroundColor: 'pink' }}>
        <MaterialIcons name="filter-alt" size={30} color="#999" onPress={toggleModal} />
        <MaterialIcons name="search" size={30} color="#999" onPress={navigateToSearchScreen} />
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
