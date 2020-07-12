import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>
      <Input name="e-mail" icon="email" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />
      <Button
        onPress={() => {
          console.log('click');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
