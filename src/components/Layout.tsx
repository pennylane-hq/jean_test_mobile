import React, { JSX } from 'react';
import { AppHeader } from './AppHeader';
import { H1, YStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Overdue = 'Overdue';
type Draft = 'Draft';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  renderRightHeaderItem?: () => JSX.Element;
  renderFAB?: () => JSX.Element;
};
export const Layout = ({ children, renderRightHeaderItem, title, renderFAB }: LayoutProps) => {
  const insects = useSafeAreaInsets();

  return (
    <YStack flex={1} gap="$4" pt={insects.top}>
      <AppHeader shouldGoBack renderRightItem={renderRightHeaderItem} title={title} />

      <YStack px="$4" flex={1}>
        {children}
      </YStack>

      {renderFAB?.()}
    </YStack>
  );
};
