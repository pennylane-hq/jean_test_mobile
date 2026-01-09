import React, { JSX } from 'react';
import { XStack, useTheme, YStack, H5 } from 'tamagui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export const HEADER_HEIGHT = 64;

type AppHeaderProps = {
  renderRightItem?: () => JSX.Element;
  shouldGoBack?: boolean;
  title?: string;
};

export const AppHeader = ({ renderRightItem, shouldGoBack = true, title }: AppHeaderProps) => {
  const insects = useSafeAreaInsets();
  const { goBack, canGoBack } = useNavigation<NavigationProp<NavigationParams>>();
  const theme = useTheme();

  return (
    <YStack
      justify="space-between"
      px="$3"
      bg="$background"
      borderBottomWidth={1}
      borderColor="$shadow3">
      <XStack>
        {canGoBack() && shouldGoBack ? (
          <MaterialIcons name="arrow-back" size={30} color={theme.accent1.get()} onPress={goBack} />
        ) : null}
        <XStack flex={1} />
        {renderRightItem?.()}
      </XStack>
      {title ? (
        <H5 size="$5" py={'$4'} fontWeight="600" color="black">
          {title}
        </H5>
      ) : null}
    </YStack>
  );
};
