import React from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

import {UserRepository} from '../../models/user-repository.model';

type RepositoryBlockProps = {
  index: number;
  repo: UserRepository;
};

export default function RepositoryBlock({
  repo,
  index,
}: RepositoryBlockProps): React.JSX.Element {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-row items-center p-4')}>
      <Text style={tailwind('text-base')}>{index + 1}.</Text>
      <View style={tailwind('ml-4')}>
        <Text style={tailwind('text-lg')}>{repo.name}</Text>
        <Text style={tailwind('')}>{repo.description}</Text>
      </View>
    </View>
  );
}
