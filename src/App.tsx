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
const API_TOKEN = '';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export const App = () => {
  return (
    <ApiProvider url="https://jean-test-api.herokuapp.com/" token={API_TOKEN}>
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
