import {
  Text,
  View,
  Image,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';

import {GitHubUser} from '../../models/github-user.model';

type UserBlockProps = {
  user: GitHubUser;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export default function UserBlock({
  user,
  onPress,
}: UserBlockProps): React.JSX.Element {
  const tailwind = useTailwind();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={tailwind('p-4 flex-row items-center')}>
        <Image
          width={50}
          height={50}
          source={{uri: user.avatarUrl}}
          style={tailwind('rounded-full')}
        />
        <Text style={tailwind('text-lg ml-4')}>{user.login}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
