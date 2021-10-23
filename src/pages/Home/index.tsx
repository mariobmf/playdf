import React, { useCallback, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { Alert } from 'react-native';
import { FileProps, useFile } from '../../context/FileContext';

import {
  Container,
  Button,
  ButtonText,
  PlaybackName,
  InputPlaybackName,
} from './styles';
import { RouteStackParamList } from '../routes';

const { StorageAccessFramework } = FileSystem;

type RouteNavigationProp = NativeStackNavigationProp<
  RouteStackParamList,
  'Home'
>;

const Home: React.FC = () => {
  const { addPdfFileUri, addPlaybackFileUri, addPlaybackName } = useFile();
  const navigation = useNavigation<RouteNavigationProp>();
  const [playbackName, setPlaybackName] = useState('');
  const [playbackFileCache, setPlaybackFileCache] = useState<FileProps>();
  const [pdfFileCache, setPdfFileCache] = useState<FileProps>();

  // Seleciona o pdf no dispositivo
  const handleSelectPDF = useCallback(async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });

    if (file.type === 'success') setPdfFileCache(file);
  }, []);

  // Seleciona o Playback no dispositivo
  const handleSelectPlayback = useCallback(async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'audio/mpeg',
      copyToCacheDirectory: false,
    });

    if (file.type === 'success') {
      setPlaybackFileCache(file);
      setPlaybackName(file.name.replace(/\.[^/.]+$/, ''));
    }
  }, []);

  // Executa o playback
  const handlePlayTrack = useCallback(async () => {
    // Se o PDF e o Playback estiverem selecionados, Então
    if (pdfFileCache && playbackFileCache) {
      // Pede Permissão de uso da media do dispositivo
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      // Se a permissão foi aceita, então
      if (mediaLibraryPermissions.granted) {
        if (FileSystem.documentDirectory) {
          const directoryPlayback = `${FileSystem.documentDirectory}/${playbackName}`; // Diretorio do Playback

          // Verifico se já existe um diretorio com mesmo nome
          const directoryPlaybackInfo = await FileSystem.getInfoAsync(
            directoryPlayback,
          );
          // Se o diretorio nao existir, então
          if (!directoryPlaybackInfo.exists) {
            await FileSystem.makeDirectoryAsync(directoryPlayback); // Crio o diretorio

            // Movo os arquivos para o novo diretorio
            await StorageAccessFramework.copyAsync({
              from: pdfFileCache.uri,
              to: `${directoryPlayback}/letra.pdf`,
            });
            await StorageAccessFramework.copyAsync({
              from: playbackFileCache.uri,
              to: `${directoryPlayback}/playback.pdf`,
            });

            addPdfFileUri(`${directoryPlayback}/letra.pdf`);
            addPlaybackFileUri(`${directoryPlayback}/playback.pdf`);

            addPlaybackName(playbackName);
            navigation.navigate('Player');
          } else {
            Alert.alert(
              '⚠️',
              'Ops, nome do playback já esta em uso!',
              [
                {
                  text: 'Voltar',
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onPress: () => {},
                  style: 'default',
                },
              ],
              { cancelable: true },
            );
          }
        }
      }
    }
  }, [
    pdfFileCache,
    playbackFileCache,
    playbackName,
    addPdfFileUri,
    addPlaybackFileUri,
    addPlaybackName,
    navigation,
  ]);

  return (
    <Container>
      <Button onPress={handleSelectPlayback}>
        <MaterialCommunityIcons name="music-note-plus" size={28} />
        <ButtonText>Adicionar Playback</ButtonText>
      </Button>
      <Button onPress={handleSelectPDF}>
        <MaterialCommunityIcons name="file-music" size={28} />
        <ButtonText>Adicionar PDF</ButtonText>
      </Button>
      {playbackFileCache && pdfFileCache ? (
        <>
          <PlaybackName>Nome do Playback</PlaybackName>
          <InputPlaybackName
            value={playbackName}
            onChangeText={setPlaybackName}
          />
          <Button onPress={handlePlayTrack}>
            <MaterialCommunityIcons name="arrow-right-drop-circle" size={28} />
            <ButtonText>Play</ButtonText>
          </Button>
        </>
      ) : null}
    </Container>
  );
};

export default Home;
