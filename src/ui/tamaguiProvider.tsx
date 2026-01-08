import { PropsWithChildren } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';

export const UIProvider = ({ children }: PropsWithChildren) => {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
};
