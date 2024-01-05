import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HeaderSearchBarProps = {
  totalResults?: number;
  onChangeText?: ((text: string) => void) | undefined;
};

function HeaderSearchBar(props: HeaderSearchBarProps): React.JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <View
        style={tailwind(
          'm-4 bg-app-offwhite flex-row items-center rounded-2xl overflow-hidden',
        )}>
        <View style={tailwind('p-5 text-xl bg-app-primary')}>
          <Icon name="person-search" size={30} color="#F0ECE5" />
        </View>
        <TextInput
          cursorColor="#B6BBC4"
          placeholderTextColor="#B6BBC4"
          onChangeText={props.onChangeText}
          placeholder="Search GitHub User..."
          style={tailwind('p-5 text-xl flex-grow text-app-primary')}
        />
      </View>
      {props.totalResults && (
        <View
          style={tailwind('mx-5 text-white flex-row items-center justify-end')}>
          <Text style={tailwind('text-gray-200 text-base')}>
            Results Found:
          </Text>
          <Text style={tailwind('ml-1 text-white text-2xl font-bold')}>
            {props.totalResults}
          </Text>
        </View>
      )}
    </>
  );
}

export default HeaderSearchBar;
