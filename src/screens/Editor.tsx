import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';
import { Button, YStack, Text } from '../ui';
import { Components, Paths } from '../api/generated/client';
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { InvoiceLineListItem } from '../components/InvoiceLineListItem';
import { ContentSection } from '../components/ContentSection';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationParams } from '../types';
import { InputField } from '../components/InputField';
import { Separator } from 'tamagui';
import { Layout } from '../components/Layout';
import { CustomerSearchSheet } from '../components/CustomerSearchSheet';
import { CustomerListItem } from '../components/CustomerListItem';
import { ProductSearchSheet } from '../components/ProductSearchSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { calculateTotal, checkNumber } from '../helpers';
import { RootStackParamList } from '../App';

type InvoiceForm = {
  customer: string;
  date: string;
  deadline: string;
  tax: string;
};

// product_id: number;
// quantity?: number;
// label?: string;
// unit?: Unit;
// vat_rate?: VatRate;
// price?: string | number;
// tax?: string | number;

//Note: add preview option

type EditorRouteParams = RouteProp<RootStackParamList, 'Editor'>;

export const EditorScreen = () => {
  const api = useApi();
  const { params } = useRoute<EditorRouteParams>();

  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();
  const queryClient = useQueryClient();

  const [deadlineVal, setDeadlineVal] = useState(params?.invoice ? params?.invoice?.deadline : '');
  const [invoiceLines, setInvoiceLines] = useState<Components.Schemas.InvoiceLineCreatePayload[]>(
    params?.invoice ? params?.invoice?.invoice_lines : [],
  );

  console.log('params', params);

  const [selectedCustomer, setSelectedCustomer] = useState<Components.Schemas.Customer>();

  const [isInvoiceLineModalOpened, setIsInvoiceLineModalOpened] = useState(false);
  const [isCustomerSearchModalOpened, setIsCustomerSearchModalOpened] = useState(false);
  const [isProductSearchModalOpened, setisProductSearchModalOpened] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceForm>({
    defaultValues: {
      customer: params?.invoice?.customer_id ? params.invoice.customer_id : 0,
      date: params?.invoice?.date ? params.invoice.date : '',
      deadline: params?.invoice?.deadline ? params.invoice.deadline : '',
      tax: params?.invoice?.tax ? params.invoice.tax : '',
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

  const getTotalSumOfAllInvoiceLines = () => {
    let totalPrice = 0;
    let totalTax = 0;
    invoiceLines?.length &&
      invoiceLines.map((line) => {
        const { sum, tax } = calculateTotal(line);
        totalPrice += sum;
        totalTax += tax;
      });
    return { totalPrice, totalTax };
  };
  const { totalPrice, totalTax } = getTotalSumOfAllInvoiceLines();

  const toggleModal = () => {
    if (isInvoiceLineModalOpened) setIsInvoiceLineModalOpened(false);
    else {
      setIsInvoiceLineModalOpened(true);
    }
  };

  const toggleCustomerSearchModal = () => {
    if (isCustomerSearchModalOpened) setIsCustomerSearchModalOpened(false);
    else {
      setIsCustomerSearchModalOpened(true);
    }
  };

  const toggleProductSearchModal = () => {
    if (isProductSearchModalOpened) setisProductSearchModalOpened(false);
    else {
      setisProductSearchModalOpened(true);
    }
  };

  const addInvoiceLine = (invoiceLine: Components.Schemas.InvoiceLineCreatePayload) => {
    setInvoiceLines((prev) => [...prev, invoiceLine]);
  };

  const handleSelectCustomer = (i: Components.Schemas.Customer) => {
    console.log('trigged,', i);
    setSelectedCustomer(i);
  };
  return (
    <>
      <Layout title="Invoice">
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={'$3'}>
            {/* TODO Customer */}
            <ContentSection title="Customer data:">
              {selectedCustomer ? <CustomerListItem customer={selectedCustomer} /> : null}
              <Button onPress={toggleCustomerSearchModal} my="$2">
                Select customer
              </Button>
            </ContentSection>

            <ContentSection title="Invoice Lines:">
              {invoiceLines?.length ? (
                <YStack gap="$1">
                  {invoiceLines?.map((invoiceLine, i) => (
                    <>
                      <InvoiceLineListItem {...invoiceLine} />
                      {invoiceLines?.length &&
                      invoiceLines.length > 1 &&
                      invoiceLines.length != i + 1 ? (
                        <Separator my={15} />
                      ) : null}
                    </>
                  ))}
                </YStack>
              ) : null}

              <Button onPress={toggleProductSearchModal} my="$2">
                Add attribute
              </Button>
            </ContentSection>

            <ContentSection title="Provide a due date:">
              <Controller
                control={control}
                name="date"
                rules={{ required: 'Date is required' }}
                render={({ field: { value, onChange } }) => (
                  <InputField value={value} onChangeText={onChange} placeholder="YYYY-MM-DD" />
                )}
              />
              {errors.date && <Text color="$red10">{errors.date.message}</Text>}
            </ContentSection>

            <ContentSection title="Result:">
              <Text color="black">Total Sum: {totalPrice} CURR</Text>
              <Text color="black">Incl VAT and TAX amounts: {totalTax} CURR</Text>
              <Button onPress={sendInvoiceData} mt="$3">
                Create invoice
              </Button>
            </ContentSection>
          </YStack>
        </ScrollView>
      </Layout>
      <CustomerSearchSheet
        open={isCustomerSearchModalOpened}
        toggleModal={toggleCustomerSearchModal}
        setCustomer={handleSelectCustomer}
      />
      <ProductSearchSheet
        open={isProductSearchModalOpened}
        toggleModal={toggleProductSearchModal}
        setInvoiceLine={addInvoiceLine}
      />
    </>
  );
};
