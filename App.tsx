/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-url-polyfill/auto';
import {TailwindProvider} from 'tailwind-rn';

import Home from './src/screens/home';
import utilities from './tailwind.json';

function App(): React.JSX.Element {
  return (
    /* @ts-ignore - TailwindProvider is missing a type definition */
    <TailwindProvider utilities={utilities}>
      <Home />
    </TailwindProvider>
  );
}

export default App;
