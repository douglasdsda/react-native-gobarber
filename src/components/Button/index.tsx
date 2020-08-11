import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ type, children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText type={type}>{children}</ButtonText>
    </Container>
  );
};

export default Button;
