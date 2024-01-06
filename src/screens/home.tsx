import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';

import UserBlock from '../components/home/user-block';
import {RootStackParamList} from '../utils/navigation';
import useSearchUser from '../service/use-search-user';
import AppIntroBanner from '../components/home/app-intro-banner';
import HeaderSearchBar from '../components/home/header-search-bar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeNavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeNavigationProps): React.JSX.Element {
  const tailwind = useTailwind();
  const [searchUser, result, clearSearch, isLoading, error] = useSearchUser();

  const onChangeText = (value: string) => searchUser(value);

  const gotoUserRepositoriesScreen = (githubUsername: string) => {
    navigation.push('UserRepositories', {username: githubUsername});
  };

  return (
    <SafeAreaView style={tailwind('bg-app-dark flex-1 justify-between')}>
      <StatusBar barStyle="light-content" />

      {/* Top Section */}
      <View
        style={tailwind(
          `mb-5 text-white justify-center ${result ? '' : 'flex-grow'}`,
        )}>
        <Image
          source={require('../images/github.png')}
          style={tailwind('w-20 h-20 self-center my-5')}
        />
        <HeaderSearchBar
          onChangeText={onChangeText}
          onClearSearch={clearSearch}
          totalResults={result?.totalResults}
        />

        {isLoading && <ActivityIndicator style={tailwind('my-2')} />}
        {error && (
          <Text style={tailwind('mx-5 mb-5 text-red-400')}>{error}</Text>
        )}

        {!result?.users && <AppIntroBanner />}
      </View>

      {/* Bottom Section */}
      {result?.users && (
        <>
          <Text style={tailwind('mx-5 mb-4 text-gray-200')}>
            Click to view their public repositories.
          </Text>

          <FlatList
            data={result?.users}
            indicatorStyle="black"
            keyboardDismissMode="on-drag"
            keyExtractor={(item, _) => `${item.id}`}
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('rounded-tr-xl rounded-tl-xl')}
            contentContainerStyle={tailwind(
              'rounded-tr-xl rounded-tl-xl overflow-hidden bg-white flex-grow',
            )}
            renderItem={({item}) => (
              <UserBlock
                user={item}
                onPress={() => gotoUserRepositoriesScreen(item.login)}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default Home;
