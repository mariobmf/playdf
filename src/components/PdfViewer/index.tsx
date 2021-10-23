import React, { useState } from 'react';

import { Container, PageText, PdfView } from './styles';

interface IPdfViewerProps {
  pdfUri: string;
}

const PdfViewer: React.FC<IPdfViewerProps> = ({ pdfUri }: IPdfViewerProps) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const source = { uri: pdfUri };

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
