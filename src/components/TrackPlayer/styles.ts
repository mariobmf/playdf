import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.View`
  height: 100px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: #f01a26;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const ButtonBack = styled.TouchableOpacity``;

export const ControlIcon = styled(FontAwesome5)`
  color: #fff;
  font-size: 40px;
`;

export const ButtonPlay = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin: 0 40px;

  width: 80px;
  height: 80px;

  border-radius: 40px;
  background: #b50c09;
`;

export const PlayIcon = styled(FontAwesome5)`
  color: #ffffff;
  font-size: 40px;
`;

export const ButtonNext = styled.TouchableOpacity``;