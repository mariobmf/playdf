import { shade } from 'polished';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  margin-top: 8px;
`;
export const AlbumContainer = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  margin: 4px 8px;
  border-radius: 6px;
  background-color: ${props => shade(0.09, props.theme.colors.light)};
`;

export const AlbumName = styled.Text`
  flex: 1;

  color: ${props => props.theme.colors.textDark};
`;

export const PlayIcon = styled(FontAwesome5)`
  margin: 0 8px;
  color: ${props => props.theme.colors.primary};
  font-size: 15px;
`;
