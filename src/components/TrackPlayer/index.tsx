import React, { useMemo } from 'react';

import {
  Container,
  TimeContainer,
  TimePosition,
  TimeSlider,
  TimeLeft,
  PlayerControl,
  ButtonBack,
  ControlIcon,
  ButtonPlay,
  PlayIcon,
  ButtonNext,
} from './styles';

interface ITrackPlayerProps {
  trackDuration: number | undefined;
  positionTrack: number;
  isPlaying: boolean;
  handlePlayPause: () => void;
}

const TrackPlayer: React.FC<ITrackPlayerProps> = ({
  isPlaying,
  trackDuration,
  positionTrack,
  handlePlayPause,
}: ITrackPlayerProps) => {
  // Posição atual formatado mm:ss
  const timePosition = useMemo(() => {
    const minutes = Math.floor(positionTrack / 60000);
    const seconds = Math.floor(positionTrack / 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  }, [positionTrack]);

  // tempo restante formatado mm:ss
  const timeLeft = useMemo(() => {
    if (trackDuration) {
      const timeLeftMilliseconds = trackDuration - positionTrack;

      const minutes = Math.floor(timeLeftMilliseconds / 60000);
      const seconds = Math.floor(timeLeftMilliseconds / 1000) % 60;

      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0',
      )}`;
    }
    return '00:00';
  }, [trackDuration, positionTrack]);

  return (
    <Container>
      <TimeContainer>
        <TimePosition>{timePosition}</TimePosition>
        <TimeSlider
          minimumValue={0}
          maximumValue={trackDuration}
          value={positionTrack}
          thumbTintColor="#b50c09"
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="#FFF"
        />
        <TimeLeft>{timeLeft}</TimeLeft>
      </TimeContainer>
      <PlayerControl>
        <ButtonBack>
          <ControlIcon name="step-backward" />
        </ButtonBack>
        <ButtonPlay onPress={handlePlayPause}>
          <PlayIcon name={isPlaying ? 'pause' : 'play'} />
        </ButtonPlay>
        <ButtonNext>
          <ControlIcon name="step-forward" />
        </ButtonNext>
      </PlayerControl>
    </Container>
  );
};

export default TrackPlayer;
