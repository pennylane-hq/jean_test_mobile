import { YStack, Text, XStack, H6 } from '../ui';
import { Components } from '../api/generated/client';
import { calculateTotal } from '../helpers';

export const InvoiceLineListItem = (invoiceLine: Components.Schemas.InvoiceLineCreatePayload) => {
  const total = calculateTotal(invoiceLine).sum;

  if (!invoiceLine?.price) {
    return null;
  }
  return (
    <YStack key={invoiceLine?.label} gap="$2">
      <H6 color="black">{invoiceLine?.label}</H6>
      <Text color="black">
        {invoiceLine.quantity} x {invoiceLine.price} CURR
      </Text>
      <Text color="black">Tax amount: {invoiceLine.tax} CURR</Text>
      <Text color="black">Vat Rate: {invoiceLine.vat_rate} %</Text>
      <XStack justify="space-between">
        <Text color="black">Result:</Text>
        <Text color="black">{total} CURRENCY (incl taxes)</Text>
      </XStack>
    </YStack>
  );
};
