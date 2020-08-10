import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Description,
  Title,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashbord' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'",
      {
        locale: ptBr,
      },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento Concluido</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
