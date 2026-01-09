import { Components } from '../api/generated/client';
import { Button, YStack, Text } from '../ui';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { InputField } from '../components/InputField';
import { ListItem, useTheme, XStack } from 'tamagui';
import { calculateTotal, calculateTotalTax, calculateVAT, checkNumber } from '../helpers';
import { ContentSection } from './ContentSection';

type InvoiceLineFormType = {
  setInvoiceLine: (form: Components.Schemas.InvoiceLineCreatePayload) => void;
  onClose?: () => void;
  product: Components.Schemas.Product;
};

type ModifiedInvoiceLineCreatePayload = Components.Schemas.InvoiceLineCreatePayload & {
  quantity: string | undefined;
};

export const InvoiceLineForm = ({ product, setInvoiceLine, onClose }: InvoiceLineFormType) => {
  const theme = useTheme();

  const initState: ModifiedInvoiceLineCreatePayload = {
    label: product?.label,
    quantity: undefined, //TODO: check docs re quantity requirements, do we accept 0
    price: undefined,
    tax: product?.unit_tax,

    unit: product?.unit,
    vat_rate: product?.vat_rate,
    product_id: product?.id,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<ModifiedInvoiceLineCreatePayload>({
    defaultValues: initState,
  });

  const quantity = watch('quantity');

  useEffect(() => {
    const price = calculateTotal({ price: product?.unit_price_without_tax, quantity })?.sum;
    const tax = calculateTotalTax({ tax: product.unit_tax, quantity });
    setValue('price', price, { shouldDirty: true });
    setValue('tax', tax, { shouldDirty: true });
  }, [quantity]);

  const onSubmit = (form: ModifiedInvoiceLineCreatePayload) => {
    setInvoiceLine({ ...form, quantity: checkNumber(form?.quantity) });
    onClose?.();
  };

  return (
    <>
      <YStack gap="$3" my="$4" style={{ width: '100%' }}>
        <ContentSection title="Quantity">
          <Controller
            control={control}
            name="quantity"
            rules={{
              required: 'Quantity is required',
              pattern: { value: /^\d+(\.\d+)?$/, message: 'Invalid number' },
            }}
            render={({ field: { value, onChange } }) => (
              <YStack gap="$2">
                <YStack mb="$2" gap="$2">
                  <XStack
                    px="$3"
                    py="$2"
                    style={{ borderRadius: 8, alignItems: 'center' }}
                    bg="$backgroundHover"
                    borderWidth={1}
                    borderColor="$borderColor">
                    <InputField
                      flex={1}
                      borderWidth={0}
                      placeholder="Enter value"
                      keyboardType="numeric"
                      placeholderTextColor="$color06"
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                      }}
                      isOutlined
                    />
                    <YStack>
                      <Text ml="$2" color={theme?.accentColor}>
                        Unit:
                      </Text>
                      <Text ml="$2" color={theme?.accentColor}>
                        {product.unit}
                      </Text>
                    </YStack>
                  </XStack>
                  {errors?.quantity?.message && (
                    <Text color="$red10">{errors.quantity.message}</Text>
                  )}
                </YStack>
                <ListItem
                  title="Price"
                  style={{ alignSelf: 'flex-end', borderRadius: 8 }}
                  subTitle={`${String(
                    calculateTotal({
                      price: product?.unit_price_without_tax,
                      quantity: value,
                    })?.sum,
                  )} CURRENCY`}
                />

                {checkNumber(product?.unit_tax) ? (
                  <ListItem
                    title="Tax"
                    style={{ alignSelf: 'flex-end', borderRadius: 8 }}
                    subTitle={`${String(calculateTotalTax({ tax: product.unit_tax, quantity: value }))} CURRENCY`}
                  />
                ) : null}

                {product?.unit_price ? (
                  <ListItem
                    title="Price incl tax"
                    style={{ alignSelf: 'flex-end', borderRadius: 8 }}
                    subTitle={`${String(
                      calculateTotal({
                        price: product?.unit_price,
                        quantity: value,
                      })?.sum,
                    )} CURRENCY`}
                  />
                ) : null}
                {product?.vat_rate ? (
                  <ContentSection title="Vat">
                    <ListItem
                      title="VAT rate"
                      style={{ alignSelf: 'flex-end' }}
                      subTitle={`${product.vat_rate} %`}
                    />
                    <ListItem
                      title="VAT amount"
                      style={{ alignSelf: 'flex-end' }}
                      subTitle={`${calculateVAT(calculateTotal({ price: product.unit_price, quantity: value }).sum, product?.vat_rate)} CURRENCY`}
                    />
                  </ContentSection>
                ) : null}
              </YStack>
            )}
          />
        </ContentSection>
      </YStack>
      <Button onPress={handleSubmit(onSubmit)}>Add</Button>
    </>
  );
};
