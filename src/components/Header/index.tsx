import React from 'react';

import { Container, TrackName } from './styles';

interface IHeaderProps {
  trackName: string;
}

const Header: React.FC<IHeaderProps> = ({ trackName }: IHeaderProps) => {
  return (
    <Container>
      <TrackName>{trackName}</TrackName>
    </Container>
  );
};

export default Header;
