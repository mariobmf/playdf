import React, { useState } from 'react';

import { Container, PageText, PdfView } from './styles';

const PdfViewer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const source = {
    // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    uri: 'https://studiosol-a.akamaihd.net/gcs/cifraclub/contrib/partituras/bruno-e-marrone-boate-azul.pdf',
    cache: false,
  };
  return (
    <Container>
      <PageText>
        {page} / {totalPage}
      </PageText>
      <PdfView
        source={source}
        horizontal
        enablePaging
        spacing={0}
        onLoadComplete={numberOfPages => {
          setTotalPage(numberOfPages);
        }}
        onPageChanged={currentPage => {
          setPage(currentPage);
        }}
      />
    </Container>
  );
};

export default PdfViewer;
