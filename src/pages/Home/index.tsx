import React, { useCallback, useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useFile } from '../../context/FileContext';

import {
  Container,
  Button,
  ButtonText,
  PlaybackName,
  InputPlaybackName,
} from './styles';
import { RouteStackParamList } from '../routes';

type RouteNavigationProp = NativeStackNavigationProp<
  RouteStackParamList,
  'Home'
>;

const Home: React.FC = () => {
  const {
    addPdfFile,
    addPlaybackFile,
    addPlaybackName,
    playbackFile,
    pdfFile,
  } = useFile();
  const navigation = useNavigation<RouteNavigationProp>();
  const [playbackName, setPlaybackName] = useState('');

  useEffect(() => {
    if (playbackFile)
      setPlaybackName(playbackFile.name.replace(/\.[^/.]+$/, ''));
  }, [playbackFile]);

  // Seleciona o pdf no dispositivo
  const handleSelectPDF = useCallback(async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (file.type === 'success') addPdfFile(file);
  }, [addPdfFile]);

  // Seleciona o Playback no dispositivo
  const handleSelectPlayback = useCallback(async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'audio/mpeg',
      copyToCacheDirectory: false,
    });

    if (file.type === 'success') addPlaybackFile(file);
  }, [addPlaybackFile]);

  // Executa o playback
  const handlePlayTrack = useCallback(async () => {
    addPlaybackName(playbackName);
    navigation.navigate('Player');
  }, [navigation, addPlaybackName, playbackName]);

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
      {playbackFile && pdfFile ? (
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
