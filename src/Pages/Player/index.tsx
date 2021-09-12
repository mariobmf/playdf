import React from 'react';

import Header from '../../components/Header';
import PdfViewer from '../../components/PdfViewer';
import TrackPlayer from '../../components/TrackPlayer';

import { Container } from './styles';

const Player: React.FC = () => {
  return (
    <Container>
      <Header />
      <PdfViewer />
      <TrackPlayer />
    </Container>
  );
};

export default Player;
