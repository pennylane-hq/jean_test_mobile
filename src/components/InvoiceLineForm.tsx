import { Components } from '../api/generated/client';
import { Button, YStack, Text } from '../ui';
import { Controller, useForm } from 'react-hook-form';
import { SelectableChips } from '../components/SelectableChips';
import { UNIT_VALUES, VAT_RATE_VALUES } from '../constants';
import React from 'react';
import { InputField } from '../components/InputField';
import { useTheme } from 'tamagui';
import { Layout } from '../components/Layout';

type InvoiceLineFormType = {
  setInvoiceLine: (form: Components.Schemas.InvoiceLineCreatePayload) => void;
  onClose?: () => void;
  product: Components.Schemas.Product;
};

export const InvoiceLineForm = ({ product, setInvoiceLine, onClose }: InvoiceLineFormType) => {
  const theme = useTheme();

  const initState: Components.Schemas.InvoiceLineCreatePayload = {
    label: '',
    tax: product?.unit_tax,
    unit: product?.unit,
    quantity: undefined,
    vat_rate: product?.vat_rate, //TODO: revisit form as It seems, I just need to miltiply quantity per data provided in product
    price: undefined,
    product_id: product?.id, // TODO: check it
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Components.Schemas.InvoiceLineCreatePayload>({
    defaultValues: initState,
  });

  const onSubmit = (form: Components.Schemas.InvoiceLineCreatePayload) => {
    setInvoiceLine({
      ...form,
      // tax: form?.tax && form?.price && percentOf(form?.price, form?.tax),
    });
    onClose?.();
  };

  return (
    <>
      <YStack gap="$3" my="$4" style={{ width: '100%' }}>
        <YStack gap="$1">
          <Text color="black">Label</Text>
          <Controller
            control={control}
            name="label"
            rules={{ required: 'Label' }}
            render={({ field: { value, onChange } }) => (
              <InputField value={value} onChangeText={onChange} placeholder="Label" />
            )}
          />
          {errors?.label?.message && <Text color="$red10">{errors.label.message}</Text>}
        </YStack>

        <YStack gap="$1">
          <Text color="black">Quantity</Text>
          <Controller
            control={control}
            name="quantity"
            rules={{ pattern: { value: /^\d+(\.\d+)?$/, message: 'Invalid number' } }}
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="0.00"
              />
            )}
          />
          {errors?.quantity?.message && <Text color="$red10">{errors.quantity.message}</Text>}
        </YStack>

        <YStack gap="$1">
          <Text color="black">Unit</Text>
          <Controller
            control={control}
            name="unit"
            render={({ field: { value, onChange } }) => (
              <SelectableChips value={value} onChange={onChange} values={UNIT_VALUES} />
            )}
          />
          {errors?.unit?.message && <Text color="$red10">{errors.unit.message}</Text>}
        </YStack>

        <YStack gap="$1">
          <Text color="black">Price</Text>
          <Controller
            control={control}
            name="price"
            rules={{ pattern: { value: /^\d+(\.\d+)?$/, message: 'Invalid number' } }}
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="0.00"
              />
            )}
          />
          {errors?.price?.message && <Text color="$red10">{errors.price.message}</Text>}
        </YStack>

        <YStack gap="$1">
          <Text color="black">Vat rate</Text>
          <Controller
            control={control}
            name="vat_rate"
            render={({ field: { value, onChange } }) => (
              <SelectableChips value={value} onChange={onChange} values={VAT_RATE_VALUES} />
            )}
          />
          {errors?.vat_rate?.message && <Text color="$red10">{errors.vat_rate.message}</Text>}
        </YStack>

        <YStack gap="$1">
          <Text color="black">Tax Percentage</Text>
          <Controller
            control={control}
            name="tax"
            rules={{ pattern: { value: /^\d+(\.\d+)?$/, message: 'Invalid number' } }}
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="0.00"
              />
            )}
          />
          {errors?.tax?.message && <Text color="$red10">{errors.tax.message}</Text>}
        </YStack>
      </YStack>
      <Button onPress={handleSubmit(onSubmit)}>Add</Button>
    </>
  );
};
