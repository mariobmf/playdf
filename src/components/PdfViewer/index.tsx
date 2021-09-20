import React from 'react';

import { Container, PdfView } from './styles';

const PdfViewer: React.FC = () => {
  const source = {
    uri: 'https://studiosol-a.akamaihd.net/gcs/cifraclub/contrib/partituras/bruno-e-marrone-boate-azul.pdf',
    cache: false,
  };
  return (
    <Container>
      <PdfView source={source} enablePaging horizontal />
    </Container>
  );
};

export default PdfViewer;
