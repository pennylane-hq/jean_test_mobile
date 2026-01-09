import React from 'react';
import { YStack, Text } from '../ui';
import { Components } from '../api/generated/client';
import { ContentSection } from '../components/ContentSection';
import { calculateTotal, checkNumber, percentOf, roundTo4DP } from '../helpers';
import { Separator } from 'tamagui';

type InvoiceResultPriceSectionParams = {
  invoiceLines: Components.Schemas.InvoiceLineCreatePayload[];
};

export const InvoiceResultPriceSection = ({ invoiceLines }: InvoiceResultPriceSectionParams) => {
  const getTotalSumOfAllInvoiceLines = () => {
    let totalPrice = 0;
    let totalTax = 0;
    let totalVAT = 0;

    invoiceLines?.length &&
      invoiceLines.map((line) => {
        const { sum, tax } = calculateTotal(line);
        totalPrice += sum;
        totalTax += tax;
        const totalLineSum = checkNumber(line?.price) + checkNumber(line?.tax);
        totalVAT += percentOf(totalLineSum, checkNumber(line?.vat_rate)) || 0;
      });

    // NOTE: be careful with rounding in fin apps
    const roundedPrice = roundTo4DP(totalPrice);
    const roundedTotalTax = roundTo4DP(totalTax);
    const roundedTotalVAT = roundTo4DP(totalVAT);
    const roundedTotalProceeds = roundTo4DP(totalPrice + totalTax + totalVAT);

    return {
      totalPrice: roundedPrice,
      totalTax: roundedTotalTax,
      totalVAT: roundedTotalVAT,
      totalProceeds: roundedTotalProceeds,
    };
  };
  const { totalPrice, totalTax, totalVAT, totalProceeds } = getTotalSumOfAllInvoiceLines();

  return (
    <ContentSection title="Result:">
      <YStack p="$4" bg="$accent1" gap="$2">
        <Text color="black">Total Sum: {totalPrice} CURR</Text>
        <Text color="black">Total TAX amount: {totalTax} CURR</Text>
        <Text color="black">Total VAT amount: {totalVAT} CURR</Text>

        <Separator my="$2" />
        <Text color="black">Total Procceeds: {totalProceeds} CURR</Text>
      </YStack>
    </ContentSection>
  );
};
