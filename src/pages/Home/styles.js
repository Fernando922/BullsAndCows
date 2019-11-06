import styled from 'styled-components/native';
import { primary, secondary } from '../../utils/colors';

export const Title = styled.Text`
  font-size: 25px;
  color: ${primary};
  margin-bottom: 50px;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${primary};
  margin: 10px;
`;

export const NumberButton = styled.Text`
  font-size: 20px;
  color: ${primary};
`;

export const ButtonSend = styled.TouchableOpacity`
  width: 200px;
  padding: 10px;
  align-items: center;
  background-color: ${primary};
  margin: 20px;
  border-radius: 5px;
`;

export const TextButtonSend = styled.Text`
  font-size: 18px;
  color: ${secondary};
`;

export const TextTip = styled.Text`
  font-size: 25px;
  color: ${primary};
  font-weight: bold;
  margin-bottom: 20px;
`;

export const TextAttempts = styled.Text`
  font-size: 20px;
  color: ${primary};
`;
