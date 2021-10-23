import styled from 'styled-components/native';
import Pdf from 'react-native-pdf';

export const Container = styled.View`
  flex: 1;
  margin: 0 8px;
`;

export const PageText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 8px;
`;

export const PdfView = styled(Pdf)`
  flex: 1;
  background: ${props => props.theme.colors.light};
  /* margin: 8px; */
`;
