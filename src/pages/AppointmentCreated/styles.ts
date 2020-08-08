import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #f4ede8;
  font-family: 'Roboto-Medium';

  text-align: center;
  margin-top: 48px;
`;
export const Description = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #999591;
  text-align: center;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  background: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 16px;
  padding: 12px 24px;
  color: #999591;
`;

export const OkButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #312e38;
`;
