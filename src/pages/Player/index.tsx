import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';

import { useFile } from '../../context/FileContext';
import Header from '../../components/Header';
import PdfViewer from '../../components/PdfViewer';
import TrackPlayer from '../../components/TrackPlayer';

import { Container } from './styles';

const Player: React.FC = () => {
  const { playbackUri, playbackName } = useFile();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(() => {
    const playback = new Audio.Sound();
    return playback;
  });
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(
    null,
  );

  // Pause e da Play na musica
  const handlePlayPause = useCallback(async () => {
    if (playbackUri) {
      // Se a Musica ainda não estiver sido carregada
      if (playbackStatus === null) {
        // Carrega o audio e da play
        await playbackObject.loadAsync(
          { uri: `${playbackUri}/playback.mp3` },
          { shouldPlay: true },
        );

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
    }
  }, [playbackObject, playbackStatus, playbackUri]);

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

  // Duração da musica
  const trackDuration = useMemo(() => {
    if (playbackStatus && playbackStatus.isLoaded) {
      if (playbackStatus.durationMillis) return playbackStatus.durationMillis;
    }
    return undefined;
  }, [playbackStatus]);

  // Posição Atual da Musica
  const positionTrack = useMemo(() => {
    if (playbackStatus && playbackStatus.isLoaded) {
      return playbackStatus.positionMillis;
    }
    return 0;
  }, [playbackStatus]);

  return (
    <Container>
      <Header trackName={playbackName || ''} />
      <PdfViewer pdfUri={playbackUri || ''} />
      <TrackPlayer
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        trackDuration={trackDuration}
        positionTrack={positionTrack}
      />
    </Container>
  );
};

export default Player;
