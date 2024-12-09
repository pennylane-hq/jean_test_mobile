import { Heading, YStack, Text } from 'ui'

export const Dummy = () => {
  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="$2"
      paddingHorizontal="$4"
    >
      <Heading textAlign="center">Welcome to JeanTest 👋</Heading>

      <Text textAlign="center">
        JeanTest is an invoicing app that allows managing & creating invoices.
      </Text>
    </YStack>
  )
}
