import { config as sourceConfig } from '@tamagui/config/v3'
import { PropsWithChildren } from 'react'
import { createTamagui, TamaguiProvider } from 'tamagui'

export const config = createTamagui(sourceConfig)

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export const UIProvider = ({ children }: PropsWithChildren) => {
  return <TamaguiProvider config={config}>{children}</TamaguiProvider>
}
