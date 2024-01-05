import React from 'react';
import 'react-native-url-polyfill/auto';
import {TailwindProvider} from 'tailwind-rn';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/screens/home';
import utilities from './tailwind.json';
import {RootStackParamList} from './src/utils/navigation';
import UserRepositories from './src/screens/user-repositories';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      {/* @ts-ignore - TailwindProvider is missing a type definition  */}
      <TailwindProvider utilities={utilities}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: '#161A30'},
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false, headerShadowVisible: false}}
          />
          <Stack.Screen name="UserRepositories" component={UserRepositories} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}

export default App;
