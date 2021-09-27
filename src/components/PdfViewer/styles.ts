import styled from 'styled-components/native';
import Pdf from 'react-native-pdf';

export const Container = styled.View`
  flex: 1;
  margin: 0 8px;
`;

export const PageText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #b50c09;
  text-align: center;
  margin-bottom: 8px;
`;

export const PdfView = styled(Pdf)`
  flex: 1;
  background: #fff;
  /* margin: 8px; */
`;
