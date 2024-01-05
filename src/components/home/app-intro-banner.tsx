import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {View, Text} from 'react-native';

function AppIntroBanner(): React.JSX.Element {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        'rounded-xl bg-app-primary items-center justify-center py-4 px-3 mb-4 mx-4 mt-2',
      )}>
      <Text style={tailwind('text-2xl text-app-light text-center font-bold')}>
        GitHub Repo Finder
      </Text>
      <Text style={tailwind('text-base text-app-light text-center')}>
        Find the user and view their public repositories.
      </Text>
    </View>
  );
}

export default AppIntroBanner;
