import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Image, Text, View} from 'react-native';

import {GitHubUser} from '../models/github-user.model';

type UserBlockProps = {
  user: GitHubUser;
};

export default function UserBlock({user}: UserBlockProps): React.JSX.Element {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('p-4 flex-row items-center')}>
      <Image
        width={50}
        height={50}
        source={{uri: user.avatarUrl}}
        style={tailwind('rounded-full')}
      />
      <Text style={tailwind('text-xl ml-4')}>{user.login}</Text>
    </View>
  );
}
