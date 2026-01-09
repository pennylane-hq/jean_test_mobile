import React, { JSX } from 'react';
import { AppHeader } from './AppHeader';
import { YStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  shouldGoBack?: boolean;
  renderRightHeaderItem?: () => JSX.Element;
  renderFAB?: () => JSX.Element;
};
export const Layout = ({
  children,
  renderRightHeaderItem,
  title,
  shouldGoBack,
  renderFAB,
}: LayoutProps) => {
  const insects = useSafeAreaInsets();

  return (
    <YStack flex={1} gap="$4" pt={insects.top} pb={insects.bottom}>
      <AppHeader
        shouldGoBack={shouldGoBack}
        renderRightItem={renderRightHeaderItem}
        title={title}
      />

      <YStack px="$4" flex={1}>
        {children}
      </YStack>

      {renderFAB?.()}
    </YStack>
  );
};
