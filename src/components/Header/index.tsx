import React from 'react';

import { Container, TrackName } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <TrackName>Nome da Musica</TrackName>
    </Container>
  );
};

export default Header;
