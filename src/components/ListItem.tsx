import { XStack, YStack } from 'tamagui';
import { Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ExtendedInvoice, NavigationParams, UserFriendlyInvoiceStatuses } from '../types';

type ListItemProps = {
  invoice: ExtendedInvoice;
};

export const ListItem = ({ invoice }: ListItemProps) => {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();

  const userFriendlyInvoiceStatus = invoice.paid
    ? UserFriendlyInvoiceStatuses?.Paid
    : UserFriendlyInvoiceStatuses.Unpaid;

  return (
    <XStack
      gap="$1"
      style={{
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'pink',
        padding: 16,
        borderRadius: 8,
      }}>
      <YStack gap="$4" style={{ justifyContent: 'center' }}>
        <Text>{invoice?.id}</Text>
        <Text>{userFriendlyInvoiceStatus}</Text>
        <Text>Due: {invoice.deadline}</Text>
      </YStack>
      <YStack gap="$4" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {invoice?.customer?.first_name} {invoice?.customer?.last_name}
        </Text>
        <Text>{invoice.total}</Text>
      </YStack>
    </XStack>
  );
};
