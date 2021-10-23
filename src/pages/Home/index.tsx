import React, { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RouteStackParamList } from '../routes';

import { Container, AlbumContainer, AlbumName, PlayIcon } from './styles';
import { useFile } from '../../context/FileContext';

type RouteNavigationProp = NativeStackNavigationProp<
  RouteStackParamList,
  'Home'
>;

const Home: React.FC = () => {
  const navigation = useNavigation<RouteNavigationProp>();
  const { addPlaybackUri, addPlaybackName } = useFile();
  const [albums, setAlbums] = useState<string[]>();

  // Busca os albuns
  useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then(permission => {
      // Se a permissão foi aceita, então
      if (permission.granted) {
        if (FileSystem.documentDirectory) {
          // busca todos os albuns salvos no aplicativo
          FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}albums`)
            .then(albumNames => setAlbums(albumNames))
            .catch(() => console.log('Nenhum album cadastrado'));

          // APAGA OS ALBUNS
          // albumNames.forEach(async element => {
          //   await FileSystem.deleteAsync(
          //     `${FileSystem.documentDirectory}/${element}`,
          //   );
          // });
        }
      }
    });
  }, []);

  // Abre o album
  const handlePlayback = useCallback(
    (playback: string) => {
      if (FileSystem.documentDirectory) {
        addPlaybackUri(`${FileSystem.documentDirectory}albums/${playback}`);
        addPlaybackName(playback);

        navigation.navigate('Player');
      }
    },
    [navigation, addPlaybackName, addPlaybackUri],
  );

  // Item do Album
  const renderItem = useCallback(
    ({ item }) => (
      <AlbumContainer
        style={{ elevation: 2 }}
        onPress={() => handlePlayback(item)}
      >
        <AlbumName numberOfLines={1} ellipsizeMode="tail">
          {item}
        </AlbumName>
        <PlayIcon name="play" />
      </AlbumContainer>
    ),
    [handlePlayback],
  );

  // Retorna o ID de cada item da lista
  const keyExtrator = useCallback(item => item.toString(), []);

  return (
    <Container>
      {albums && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={albums}
          renderItem={renderItem}
          keyExtractor={keyExtrator}
        />
      )}
    </Container>
  );
};

export default Home;
