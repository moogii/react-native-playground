import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './navigations';

const App = () => {
  return (
    <>
      <StatusBar hidden={false} barStyle={"light-content"} />
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </>
  );
};

export default App;
