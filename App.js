import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { store } from './src/store/configureStore';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {

  // eas build -p android --profile preview
  // eas update --branch preview --message "Updating the app"

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PaperProvider>
          <DrawerNavigator />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

