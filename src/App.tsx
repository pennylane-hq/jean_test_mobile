import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UIProvider } from './ui/tamaguiProvider';
import { HomeScreen } from './screens/Home';
import { EditorScreen } from './screens/Editor';
import { ApiProvider } from './api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Components } from './api/generated/client';
import { ExtendedInvoice, NavigationParams } from './types';

/**
 * API token to authenticate requests
 * provided by email.
 */
/**
 * Should not remain like that, it's not a public info
 */

const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN!;
const API_URL = process.env.EXPO_PUBLIC_API_URL!;

const queryClient = new QueryClient();
const Stack = createStackNavigator();

if (__DEV__) {
  import('./ReactotronConfig');
}

export const App = () => {
  return (
    <ApiProvider url={API_URL} token={API_TOKEN}>
      <QueryClientProvider client={queryClient}>
        <UIProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <YStack flex={1}>
                <Stack.Navigator
                  screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Editor" component={EditorScreen} />
                </Stack.Navigator>
              </YStack>
            </NavigationContainer>
          </SafeAreaProvider>
        </UIProvider>
      </QueryClientProvider>
    </ApiProvider>
  );
};
