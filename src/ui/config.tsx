import { defaultConfig } from '@tamagui/config/v4';
import { PropsWithChildren } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

export const tamaguiConfig = createTamagui(defaultConfig);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export const UIProvider = ({ children }: PropsWithChildren) => {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
};
