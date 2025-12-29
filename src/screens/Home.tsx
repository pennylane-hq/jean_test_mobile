import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useApi } from '../api';
import { useEffect, useState } from 'react';
import { NavigationParams } from '../types';
import { Button, H1, Text, YStack } from '../ui';

export const HomeScreen = () => {
  const api = useApi();
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    api
      .getInvoices({
        page: 1,
        per_page: 50,
        filter: JSON.stringify([]),
      })
      .then((res) => {
        setCount(res.data.pagination.total_entries);
      });
  }, []);

  return (
    <YStack gap="$4" style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <H1 size="$5" fontWeight="600" color="black">
        Pennylane Invoice Editor
      </H1>
      <Text color="black">We currently have {count} invoices.</Text>
      <Button onPress={() => navigate('Editor')}>Create a new one</Button>
    </YStack>
  );
};
