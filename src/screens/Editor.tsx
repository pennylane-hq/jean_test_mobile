import { Alert } from 'react-native';
import { Button, YStack, Text, Switch } from '../ui';
import { Components } from '../api/generated/client';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { InvoiceLineListItem } from '../components/InvoiceLineListItem';
import { ContentSection } from '../components/ContentSection';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { CustomerSearchSheet } from '../components/CustomerSearchSheet';
import { ProductSearchSheet } from '../components/ProductSearchSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { SIMPLE_DATES_VALIDATION_RULES } from '../helpers';
import { InvoiceResultPriceSection } from '../components/InvoiceResultPriceSection';
import { NavigationParams } from '../types';
import { SelectedItemWithButton } from '../components/SectedItemWithButton';
import { useInvoiceAPI } from '../hooks/useInvoice';

//NOTE: a preview option can be added

type EditorRouteParams = RouteProp<NavigationParams, 'Editor'>;

export const EditorScreen = () => {
  const { canGoBack, goBack } = useNavigation<NavigationProp<NavigationParams>>();
  const { params } = useRoute<EditorRouteParams>();
  const isEditable = !!params?.invoice && !params.invoice.finalized;
  const isCreationFlow = !params?.invoice?.id;

  const [invoiceLines, setInvoiceLines] = useState<Components.Schemas.InvoiceLineCreatePayload[]>(
    params?.invoice ? params?.invoice?.invoice_lines : [],
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Components.Schemas.Customer | undefined>(
    params?.invoice?.customer,
  );

  const [isCustomerSearchModalOpened, setIsCustomerSearchModalOpened] = useState(false);
  const [isProductSearchModalOpened, setisProductSearchModalOpened] = useState(false);

  const { createInvoiceMutation, patchInvoiceMutation, deleteInvoiceMutation } = useInvoiceAPI(
    () => {
      canGoBack() && goBack();
    },
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Components.Schemas.InvoiceCreatePayload>({
    defaultValues: {
      customer_id: params?.invoice?.customer?.id,
      date: params?.invoice?.date ? params.invoice.date : '',
      deadline: params?.invoice?.deadline ? params.invoice.deadline : '',
      invoice_lines_attributes: invoiceLines,
      finalized: params?.invoice?.finalized, //TODO: get back to it
      paid: params?.invoice?.paid, // TODO: check it
    },
  });

  useEffect(() => {
    setValue('invoice_lines_attributes', invoiceLines);
  }, [invoiceLines]);

  useEffect(() => {
    if (selectedCustomer?.id) {
      setValue('customer_id', selectedCustomer.id);
    }
  }, [selectedCustomer]);

  const onSubmitNew = (form: Components.Schemas.InvoiceCreatePayload) => {
    if (!selectedCustomer) {
      Alert.alert('Missing customer', 'Please select a customer before saving the invoice');
      return;
    }
    createInvoiceMutation.mutate({
      invoice: form,
    });
  };

  const onSubmitUpdate = (form: Components.Schemas.InvoiceCreatePayload) => {
    if (!selectedCustomer) {
      Alert.alert('Missing customer', 'Please select a customer before saving the invoice');
      return;
    }
    if (!params?.invoice?.id) {
      Alert.alert('Missing invoice identifier', 'Please check whether invoice exists');
      return;
    }
    patchInvoiceMutation.mutate({
      invoice: { ...form, id: params.invoice.id },
    });
  };

  const onSubmitDelete = (form: Components.Schemas.InvoiceCreatePayload) => {
    if (!params?.invoice?.id) {
      Alert.alert('Missing invoice identifier', 'Please check whether invoice exists');
      return;
    }
    deleteInvoiceMutation.mutate(params.invoice.id);
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

  const getAddAttributeCTA = () => {
    return isCreationFlow || isEditable ? (
      <Button onPress={toggleProductSearchModal} my="$2">
        Add attribute
      </Button>
    ) : null;
  };

  const getSubmitCTA = () => {
    if (isCreationFlow) {
      return (
        <Button onPress={handleSubmit(onSubmitNew)} mt="$3">
          Create invoice
        </Button>
      );
    } else if (isEditable) {
      return (
        <>
          <Button onPress={handleSubmit(onSubmitUpdate)} mt="$3">
            Update invoice
          </Button>
          <Button onPress={handleSubmit(onSubmitDelete)} bg="$outlineColor">
            Delete invoice
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Layout title="Invoice">
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$3">
            <ContentSection title="Customer data:">
              <SelectedItemWithButton
                selectBtnTitle="Select customer"
                selectedItemSubtitle={
                  selectedCustomer
                    ? selectedCustomer.first_name + selectedCustomer.last_name
                    : undefined
                }
                selectedItemTitle="Selected customer"
                isEditable={isCreationFlow || isEditable}
                onSelect={toggleCustomerSearchModal}
              />
            </ContentSection>

            <ContentSection title="Invoice Lines:">
              {invoiceLines?.length ? (
                <YStack gap="$1">
                  {invoiceLines?.map((invoiceLine, i) => (
                    <InvoiceLineListItem {...invoiceLine} key={invoiceLine?.product_id || 0 + i} />
                  ))}
                </YStack>
              ) : null}
            </ContentSection>

            {getAddAttributeCTA()}

            <ContentSection title="Provide a date of issue:">
              <Controller
                control={control}
                name="date"
                rules={SIMPLE_DATES_VALIDATION_RULES}
                render={({ field: { value, onChange } }) => (
                  <InputField
                    value={value ? value : undefined}
                    onChangeText={onChange}
                    placeholder="YYYY-MM-DD"
                  />
                )}
              />
              {errors.date && <Text color="$red10">{errors.date.message}</Text>}
            </ContentSection>

            <ContentSection title="Provide a due date:">
              <Controller
                control={control}
                name="deadline"
                rules={SIMPLE_DATES_VALIDATION_RULES}
                render={({ field: { value, onChange } }) => (
                  <InputField
                    value={value ? value : undefined}
                    onChangeText={onChange}
                    placeholder="YYYY-MM-DD"
                  />
                )}
              />
              {errors.date && <Text color="$red10">{errors.date.message}</Text>}
            </ContentSection>

            <InvoiceResultPriceSection invoiceLines={invoiceLines} />

            <ContentSection title="Is finalized?">
              <Controller
                control={control}
                name="finalized"
                render={({ field }) => (
                  <Switch size="$3" checked={field.value} onCheckedChange={field.onChange}>
                    <Switch.Thumb />
                  </Switch>
                )}
              />
            </ContentSection>
            <ContentSection title="Is paid?">
              <Controller
                control={control}
                name="paid"
                render={({ field }) => (
                  <Switch size="$3" checked={field.value} onCheckedChange={field.onChange}>
                    <Switch.Thumb />
                  </Switch>
                )}
              />
            </ContentSection>

            {getSubmitCTA()}
          </YStack>
        </ScrollView>
      </Layout>
      <CustomerSearchSheet
        open={isCustomerSearchModalOpened}
        toggleModal={toggleCustomerSearchModal}
        setCustomer={setSelectedCustomer}
      />
      <ProductSearchSheet
        open={isProductSearchModalOpened}
        toggleModal={toggleProductSearchModal}
        setInvoiceLine={addInvoiceLine}
      />
    </>
  );
};
