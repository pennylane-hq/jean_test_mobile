import React from 'react';
import { Button } from '../ui';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

type FloatingButtonProps = {
  onPress?: () => void;
};

export const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Button
      position="absolute"
      r="$4"
      b={insets.bottom + 16}
      size="$6"
      circular
      elevation="$3"
      onPress={onPress}
      bg="$accent1">
      <MaterialIcons name="add" size={24} color="white" />
    </Button>
  );
};
