import React, { useState } from 'react';
import { Components } from '../api/generated/client';
import { Text } from '../ui';
import { useTheme, YStack } from 'tamagui';

type CustomerSearchSheetType = {
  customer: Components.Schemas.Customer | undefined;
  onPress?: () => void;
};

export const CustomerListItem = ({ customer, onPress }: CustomerSearchSheetType) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  if (!customer) return;
  return (
    <YStack onPress={onPress}>
      <Text color="black">{customer?.first_name + customer?.last_name}</Text>
    </YStack>
  );
};
