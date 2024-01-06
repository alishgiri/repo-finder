import React from 'react';
import {Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

function NoItemsFound(): React.JSX.Element {
  const tailwind = useTailwind();

  return (
    <Text style={tailwind('text-gray-500 text-sm p-4 text-center')}>
      No Items Found.
    </Text>
  );
}

export default NoItemsFound;
