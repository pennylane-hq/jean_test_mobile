import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';
import { Button, Input, Label, YStack, Text } from '../ui';
import { Components, Paths } from '../api/generated/client';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { InvoiceLineFormSheet } from '../components/InvoiceAttributeFormSheet';

type InvoiceForm = {
  customer: string;
  date: string;
  deadline: string;
  tax: string;
};

export const EditorScreen = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const [deadlineVal, setDeadlineVal] = useState('');
  const [attributes, setAttributes] = useState<Components.Schemas.InvoiceLine[]>([]);
  const [isInvoiceLineModalOpened, setIsInvoiceLineModalOpened] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceForm>({
    defaultValues: {
      customer: '',
      date: '',
      deadline: '',
      tax: '',
    },
  });

  const onCreateInvoice = useMutation({
    mutationFn: (data: Paths.PostInvoices.RequestBody) =>
      api.postInvoices(null, data).then((r) => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: 'queryKeys.invoices.all',
      });
    },
  });

  const sendInvoiceData = () => {
    onCreateInvoice.mutate({
      invoice: {
        customer_id: 6773,
        finalized: false,
        paid: true,
        date: '2021-02-03',
        deadline: '2021-03-05',
        invoice_lines_attributes: [
          {
            product_id: 67,
            quantity: 1,
            label: 'Tesla Model S with Pennylane logo',
            price: 120,
            tax: 20,
          },
          {
            product_id: 12,
            quantity: 2,
            label: 'Service fee',
            price: '300.00',
            tax: '60.00',
          },
        ],
      },
    });
  };

  const getTotalSum = () => {
    //TODO
    return 0;
  };

  const toggleModal = () => {
    if (isInvoiceLineModalOpened) setIsInvoiceLineModalOpened(false);
    else {
      setIsInvoiceLineModalOpened(true);
    }
  };

  const pushInvoiceLine = (attribute: Components.Schemas.InvoiceLine) => {
    setAttributes((prev) => [...prev, attribute]);
  };

  return (
    <>
      <YStack gap="$4" style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {/* Customer */}
        <YStack gap="$1">
          <Text>Customer</Text>
          <Controller
            control={control}
            name="customer"
            rules={{ required: 'Customer is required' }}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChangeText={onChange} placeholder="Customer name" />
            )}
          />
          {errors.customer && <Text color="$red10">{errors.customer.message}</Text>}
        </YStack>

        <Text color="black">Attributes</Text>
        <YStack gap="$1">
          {attributes?.map((attribute) => (
            <YStack key={attribute?.invoice_id}>
              <Text>{attribute?.label}</Text>
              <Text>{attribute.price}</Text>
              <Text>{attribute.quantity}</Text>
              <Text>{attribute.tax}</Text>
            </YStack>
          ))}
        </YStack>
        <Button onPress={toggleModal}>Add attribute</Button>

        <Text color="black">Provide a due date</Text>
        {/* Date */}
        <YStack gap="$1">
          <Text>Date</Text>
          <Controller
            control={control}
            name="date"
            rules={{ required: 'Date is required' }}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChangeText={onChange} placeholder="YYYY-MM-DD" />
            )}
          />
          {errors.date && <Text color="$red10">{errors.date.message}</Text>}
        </YStack>

        <Label>TAX</Label>
        <Label> Total Sum: {getTotalSum()}</Label>
        <Button onPress={sendInvoiceData}>Create invoice</Button>
      </YStack>
      <InvoiceLineFormSheet
        open={isInvoiceLineModalOpened}
        toggleModal={toggleModal}
        setAttribute={setAttributes}
      />
    </>
  );
};
