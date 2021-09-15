import React from 'react';

import {
  Container,
  ButtonBack,
  ControlIcon,
  ButtonPlay,
  PlayIcon,
  ButtonNext,
} from './styles';

interface ITrackPlayerProps {
  isPlaying: boolean;
  handlePlayPause: () => void;
}

const TrackPlayer: React.FC<ITrackPlayerProps> = ({
  isPlaying,
  handlePlayPause,
}: ITrackPlayerProps) => {
  return (
    <Container>
      <ButtonBack>
        <ControlIcon name="step-backward" />
      </ButtonBack>
      <ButtonPlay onPress={handlePlayPause}>
        <PlayIcon name={isPlaying ? 'pause' : 'play'} />
      </ButtonPlay>
      <ButtonNext>
        <ControlIcon name="step-forward" />
      </ButtonNext>
    </Container>
  );
};

export default TrackPlayer;
