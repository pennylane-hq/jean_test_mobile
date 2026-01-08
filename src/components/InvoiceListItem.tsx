import { XStack, YStack } from 'tamagui';
import { Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ExtendedInvoice, NavigationParams, UserFriendlyInvoiceStatuses } from '../types';

type InvoiceListItemProps = {
  invoice: ExtendedInvoice;
  onPress?: () => void;
};

export const InvoiceListItem = ({ invoice, onPress }: InvoiceListItemProps) => {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();

  const userFriendlyInvoiceStatus = invoice.paid
    ? UserFriendlyInvoiceStatuses?.Paid
    : UserFriendlyInvoiceStatuses.Unpaid;

  return (
    <XStack
      gap="$1"
      bg="$color2"
      justify="space-between"
      p="$4"
      style={{
        width: '100%',
        borderRadius: 8,
      }}
      onPress={onPress}>
      <YStack gap="$4" style={{ justifyContent: 'center' }}>
        <Text>{invoice?.id}</Text>
        <Text>{userFriendlyInvoiceStatus}</Text>
        <Text>Due: {invoice.deadline}</Text>
      </YStack>
      <YStack gap="$4" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {invoice?.customer?.first_name} {invoice?.customer?.last_name}
        </Text>
        <Text>{invoice.total} CUR</Text>
      </YStack>
    </XStack>
  );
};
