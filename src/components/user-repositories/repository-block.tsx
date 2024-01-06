import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {UserRepository} from '../../models/user-repository.model';
import useFetchRepositoryInfo from '../../service/use-fetch-repository-info';

type RepositoryBlockProps = {
  index: number;
  repo: UserRepository;
};

export default function RepositoryBlock({
  repo,
  index,
}: RepositoryBlockProps): React.JSX.Element {
  const tailwind = useTailwind();

  const [fetchRepoInfo, result, isLoading, error] = useFetchRepositoryInfo();

  const onPressRepository = () => {
    if (result) return;
    fetchRepoInfo(repo);
  };

  return (
    <View style={tailwind(`p-4 ${index % 2 === 0 ? 'bg-gray-100' : ''}`)}>
      <TouchableWithoutFeedback onPress={onPressRepository}>
        <View>
          <View style={tailwind('flex-row items-center')}>
            <Text style={tailwind('text-base')}>{index + 1}.</Text>
            <View style={tailwind('ml-4')}>
              <Text style={tailwind('text-xl')}>{repo.name}</Text>
              <Text style={tailwind('')}>{repo.description}</Text>
            </View>
          </View>

          <View style={tailwind('flex-row py-2 mt-2 justify-end')}>
            {/* Star Block */}
            <View
              style={tailwind(
                'flex-row items-center border border-gray-200 rounded-lg p-2',
              )}>
              <Icon name="star-border" size={20} color="#31304D" />
              <Text style={tailwind('ml-1')}>Star</Text>
              <Text style={tailwind('ml-1')}>{repo.stargazersCount ?? 0}</Text>
            </View>

            {/* Forks Block */}
            <View
              style={tailwind(
                'flex-row items-center border border-gray-200 rounded-lg p-2 ml-4',
              )}>
              <Icon name="share" size={20} color="#31304D" />
              <Text style={tailwind('ml-1')}>Forks</Text>
              <Text style={tailwind('ml-1')}>{repo.forksCount ?? 0}</Text>
            </View>
          </View>

          {isLoading && <ActivityIndicator style={tailwind('pt-4')} />}
          {error && <Text style={tailwind('text-red-400 pt-4')}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>

      {/* Languages */}
      {result && (
        <View style={tailwind('flex-row items-center rounded-lg ml-2')}>
          <Text style={tailwind('text-sm ml-1')}>Languages:</Text>
          {result.languages.length === 0 ? (
            <Text style={tailwind('ml-2 rounded-full')}>-</Text>
          ) : (
            <ScrollView horizontal contentContainerStyle={tailwind('pr-3')}>
              {result.languages.map((lang, i) => (
                <View
                  key={lang}
                  style={tailwind(
                    `m-1 rounded-full px-2 py-1 ${
                      i === 0 ? 'bg-app-dark' : 'border border-app-dark'
                    }`,
                  )}>
                  <Text
                    style={tailwind(
                      `rounded-full ${
                        i === 0 ? 'text-white' : 'text-app-dark'
                      }`,
                    )}>
                    {lang}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}
