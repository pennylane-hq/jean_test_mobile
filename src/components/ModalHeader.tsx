import React from 'react';
import { XStack, useTheme, H6, Separator, YStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

type ModalHeaderProps = {
  onClose?: () => void;
  title?: string;
};

export const ModalHeader = ({ onClose, title }: ModalHeaderProps) => {
  const theme = useTheme();

  return (
    <YStack>
      <XStack justify="space-between" mb="$4">
        {title ? <H6>{title}</H6> : null}
        <MaterialIcons name="close" size={30} color={theme.accent1.get()} onPress={onClose} />
      </XStack>
      <Separator mb="$4" />
    </YStack>
  );
};
