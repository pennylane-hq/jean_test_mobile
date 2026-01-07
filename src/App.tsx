import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UIProvider } from './ui/config';
import { HomeScreen } from './screens/Home';
import { EditorScreen } from './screens/Editor';
import { ApiProvider } from './api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export const App = () => {
  console.log('url', API_URL);
  return (
    <ApiProvider url={API_URL} token={API_TOKEN}>
      <QueryClientProvider client={queryClient}>
        <UIProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Editor" component={EditorScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </UIProvider>
      </QueryClientProvider>
    </ApiProvider>
  );
};
