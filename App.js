import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { store } from './src/store/configureStore';
import { StatusBar} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {

  // eas build -p android --profile preview
  // eas update --branch preview --message "Updating the app"

  return (
    <NavigationContainer>
      <StatusBar translucent={true} />
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

