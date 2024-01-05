import React from 'react';
import {View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

function AppIntroBanner(): React.JSX.Element {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        'rounded-xl bg-app-primary items-center justify-center p-10',
      )}>
      <Text style={tailwind('text-4xl text-app-light text-center')}>
        GitHub Repo Finder
      </Text>
      <Text style={tailwind('text-base text-app-light text-center')}>
        Find the user and view their repository.
      </Text>
    </View>
  );
}

export default AppIntroBanner;
