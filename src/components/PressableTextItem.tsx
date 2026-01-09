import React from 'react';
import { Text } from '../ui';
import { YStack } from 'tamagui';

type PressableTextItemType = {
  text: string;
  onPress?: () => void;
};

export const PressableTextItem = ({ text, onPress }: PressableTextItemType) => {
  return (
    <YStack onPress={onPress} py="$2">
      <Text color="black">{text}</Text>
    </YStack>
  );
};
