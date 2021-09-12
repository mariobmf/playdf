import React from 'react';

import {
  Container,
  ButtonBack,
  ControlIcon,
  ButtonPlay,
  PlayIcon,
  ButtonNext,
} from './styles';

const TrackPlayer: React.FC = () => {
  return (
    <Container>
      <ButtonBack>
        <ControlIcon name="step-backward" />
      </ButtonBack>
      <ButtonPlay>
        <PlayIcon name="play" />
      </ButtonPlay>
      <ButtonNext>
        <ControlIcon name="step-forward" />
      </ButtonNext>
    </Container>
  );
};

export default TrackPlayer;
