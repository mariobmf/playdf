import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  border-radius: 20px;

  background: ${props => props.theme.colors.primary};
`;

export const AddIcon = styled(MaterialCommunityIcons)`
  font-size: 25px;
  color: ${props => props.theme.colors.light};
`;
