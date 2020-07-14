import React, { useCallback, useRef } from 'react';
import {
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignUp, BackToSignUpText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);

  const formRef = useRef<FormHandles>(null);
  const handlerOnSignUp = useCallback((data: Record<string, unknown>) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handlerOnSignUp}>
              <Input
                autoCapitalize="words"
                name="user"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInput.current?.focus();
                }}
              />
              <Input
                ref={emailInput}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="mail"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInput.current?.focus();
                }}
              />
              <Input
                ref={passwordInput}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignUp
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignUpText>Voltar para logon</BackToSignUpText>
      </BackToSignUp>
    </>
  );
};

export default SignUp;
