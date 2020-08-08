import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Description,
  Title,
  OkButton,
  OkButtonText,
} from './styles';

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashbord' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento Concluido</Title>
      <Description>
        Terça dia 14 de marco as 2020 as 12:00 com Douglas Souza dos Anjos
      </Description>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
