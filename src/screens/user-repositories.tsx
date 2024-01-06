import {
  View,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../utils/navigation';
import NoItemsFound from '../components/no-items-found';
import useFetchRepositories from '../service/use-fetch-repositories';
import RepositoryBlock from '../components/user-repositories/repository-block';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'UserRepositories'
>;

function UserRepositories({
  route,
  navigation,
}: NavigationProps): React.JSX.Element {
  const {username} = route.params;

  const tailwind = useTailwind();
  const [result, isLoading, error] = useFetchRepositories(username);

  useEffect(() => {
    navigation.setOptions({title: username});
  }, []);

  return (
    <SafeAreaView style={tailwind('bg-app-dark flex-1 justify-between')}>
      <StatusBar barStyle="light-content" />

      <View
        style={tailwind(
          `mb-2 text-white justify-center ${result ? '' : 'flex-grow'}`,
        )}>
        {isLoading && <ActivityIndicator style={tailwind('mb-5')} />}
        {error && (
          <Text style={tailwind('mx-5 mb-5 text-red-400 text-center')}>
            {error}
          </Text>
        )}
      </View>

      {result?.repositories && (
        <>
          <Text style={tailwind('text-gray-200 text-2xl font-bold mx-4')}>
            Repositories
          </Text>
          <Text style={tailwind('text-gray-200 text-sm mx-4 mb-2')}>
            Click to view more info.
          </Text>
          <FlatList
            indicatorStyle="black"
            data={result?.repositories}
            keyboardDismissMode="on-drag"
            ListEmptyComponent={<NoItemsFound />}
            keyExtractor={(item, _) => `${item.id}`}
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('rounded-tr-xl rounded-tl-xl')}
            contentContainerStyle={tailwind(
              'rounded-tr-xl rounded-tl-xl overflow-hidden bg-white flex-grow',
            )}
            renderItem={({item, index}) => (
              <RepositoryBlock repo={item} index={index} />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default UserRepositories;
