import React, { useCallback, useState, useEffect } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';

import Header from '../../components/Header';
import PdfViewer from '../../components/PdfViewer';
import TrackPlayer from '../../components/TrackPlayer';

import { Container } from './styles';

const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(() => {
    const playback = new Audio.Sound();
    return playback;
  });
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(
    null,
  );

  const audio = {
    filename: 'My Awesome Audio',
    uri: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  };

  // Pause e da Play na musica
  const handlePlayPause = useCallback(async () => {
    // Se a Musica ainda não estiver sido carregada
    if (playbackStatus === null) {
      // Carrega o audio e da play
      await playbackObject.loadAsync({ uri: audio.uri }, { shouldPlay: true });

      await playbackObject.setProgressUpdateIntervalAsync(1000);

      playbackObject.setOnPlaybackStatusUpdate(status => {
        setPlaybackStatus(status);
      });

      setIsPlaying(true);
    }

    // Se o Audio já foi carregado, então
    if (playbackStatus && playbackStatus.isLoaded) {
      // Se o audio estiver tocando, então
      if (playbackStatus.isPlaying) {
        await playbackObject.pauseAsync();

        setIsPlaying(false);
      }
      // Se o audio estiver pausado, então
      if (!playbackStatus.isPlaying) {
        await playbackObject.playAsync();
        setIsPlaying(true);
      }
    }
  }, [audio.uri, playbackObject, playbackStatus]);

  useEffect(() => {
    if (playbackStatus && playbackStatus.isLoaded) {
      if (playbackStatus.didJustFinish) {
        setIsPlaying(false);
        playbackObject.unloadAsync().then(() => {
          setPlaybackStatus(null);
        });
      }
    }
  }, [playbackStatus, playbackObject]);

  return (
    <Container>
      <Header />
      <PdfViewer />
      <TrackPlayer handlePlayPause={handlePlayPause} isPlaying={isPlaying} />
    </Container>
  );
};

export default Player;
