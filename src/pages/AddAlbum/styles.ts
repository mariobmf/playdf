import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  height: 40px;
  width: 80%;
  align-items: center;
  justify-content: center;

  margin-top: 16px;

  border-radius: 8px;

  background: ${props => props.theme.colors.primary};
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
`;

export const PlaybackName = styled.Text`
  font-size: 16px;
  margin-top: 16px;
`;

export const InputPlaybackName = styled.TextInput`
  width: 80%;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primary};
`;
