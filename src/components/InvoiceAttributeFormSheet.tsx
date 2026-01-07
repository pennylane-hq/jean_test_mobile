import { Button, Input, YStack, Text, Sheet } from '../ui';
import { Controller, useForm } from 'react-hook-form';

type InvoiceAttributeForm = {
  attributeName: string;
  attributeDescription: string;
  tax: string;
};

type InvoiceLineFormSheetType = {
  open: boolean;
  toggleModal: () => void;
  setAttribute: () => void;
};

export const InvoiceLineFormSheet = ({
  open,
  toggleModal,
  setAttribute,
}: InvoiceLineFormSheetType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceAttributeForm>({
    defaultValues: {
      attributeName: '',
      attributeDescription: '',
      tax: '',
    },
  });

  const onSubmit = (form: InvoiceAttributeForm) => {
    setAttribute(form); //TODO: need to parse it firstly
    toggleModal();
  };

  return (
    <Sheet open={open}>
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Button onPress={toggleModal}>Close</Button>

        {/* Date */}
        <YStack gap="$1">
          <Text>Item Name</Text>
          <Controller
            control={control}
            name="attributeName"
            rules={{ required: 'Attribute Name' }}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChangeText={onChange} placeholder="YYYY-MM-DD" />
            )}
          />
          {errors.attributeName && <Text color="$red10">{errors.attributeName.message}</Text>}
        </YStack>

        {/* Deadline */}
        <YStack gap="$1">
          <Text>Item Description</Text>
          <Controller
            control={control}
            name="attributeDescription"
            rules={{ required: 'Attribute Description is required' }}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChangeText={onChange} placeholder="Customer name" />
            )}
          />
          {errors.attributeDescription && (
            <Text color="$red10">{errors.attributeDescription.message}</Text>
          )}
        </YStack>

        {/* Tax */}
        <YStack gap="$1">
          <Text>Tax Percentage</Text>
          <Controller
            control={control}
            name="tax"
            rules={{ pattern: { value: /^\d+(\.\d+)?$/, message: 'Invalid number' } }}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="0.00"
              />
            )}
          />
          {errors.tax && <Text color="$red10">{errors.tax.message}</Text>}
        </YStack>
        <Button onPress={handleSubmit(onSubmit)}>Add</Button>
      </Sheet.Frame>
    </Sheet>
  );
};
