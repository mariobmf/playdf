import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';
import { shade } from 'polished';

export const Container = styled.View`
  /* height: 100px; */

  background: ${props => props.theme.colors.primary};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const TimeContainer = styled.View`
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;

  margin: 4px 16px;
`;

export const TimePosition = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.light};
`;

export const TimeSlider = styled(Slider)`
  flex: 1;
`;

export const TimeLeft = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.light};
`;

export const PlayerControl = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-bottom: 8px;
`;

export const ButtonBack = styled.TouchableOpacity``;

export const ControlIcon = styled(FontAwesome5)`
  color: ${props => props.theme.colors.light};
  font-size: 30px;
`;

export const ButtonPlay = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin: 0 40px;

  width: 60px;
  height: 60px;

  border-radius: 30px;
  background: ${props => shade(0.2, props.theme.colors.primary)};
`;

export const PlayIcon = styled(FontAwesome5)`
  color: ${props => props.theme.colors.light};
  font-size: 30px;
`;

export const ButtonNext = styled.TouchableOpacity``;
