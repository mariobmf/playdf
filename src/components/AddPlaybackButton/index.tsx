import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../pages/routes';

import { Container, AddIcon } from './styles';

type RouteNavigationProp = NativeStackNavigationProp<
  RouteStackParamList,
  'Home'
>;

const AddPlaybackButton: React.FC = () => {
  const navigation = useNavigation<RouteNavigationProp>();

  const handleAddPlayback = useCallback(() => {
    navigation.navigate('AddAlbum');
  }, [navigation]);

  return (
    <Container onPress={handleAddPlayback}>
      <AddIcon name="music-note-plus" />
    </Container>
  );
};

export default AddPlaybackButton;
