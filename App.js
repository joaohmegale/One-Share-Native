import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import store from './redux/store';
import Routes from './src/routes';


export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}


