import React from 'react';
import {useTailwind} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';

type HeaderSearchBarProps = {
  totalResults?: number;
  onClearSearch: () => void;
  onChangeText: (text: string) => void;
};

function HeaderSearchBar(props: HeaderSearchBarProps): React.JSX.Element {
  const tailwind = useTailwind();
  let textInput: TextInput | null;

  const onClearTextInput = () => {
    textInput?.clear();
    props.onClearSearch();
  };

  return (
    <>
      <View
        style={tailwind(
          'm-4 bg-app-offwhite flex-row items-center rounded-2xl overflow-hidden',
        )}>
        <View style={tailwind('p-5 h-full text-xl bg-app-primary')}>
          <Icon name="person-search" size={30} color="#F0ECE5" />
        </View>
        <TextInput
          ref={input => {
            textInput = input;
          }}
          placeholderTextColor="#B6BBC4"
          onChangeText={props.onChangeText}
          placeholder="Search GitHub User..."
          style={tailwind('p-4 h-full text-xl flex-grow text-app-primary mb-1')}
        />
        {props.totalResults && (
          <TouchableWithoutFeedback onPress={onClearTextInput}>
            <View style={tailwind('p-2 mr-2 bg-app-primary rounded-full')}>
              <Icon name="close" size={20} color="#F0ECE5" />
            </View>
          </TouchableWithoutFeedback>
        )}
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
