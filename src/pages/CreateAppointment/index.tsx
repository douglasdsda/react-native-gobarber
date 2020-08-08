import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePikerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content,
  CreatedAppointmentButton,
  CreatedAppointmentButtonText,
} from './styles';
import Button from '../../components/Button';

interface RouteParams {
  providerId: string;
}

interface HourProps {
  available: boolean;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();

  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const [showDatePiker, setShowDatePiker] = useState(false);

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });
  }, [setProviders]);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedProvider, selectedDate]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback(
    providerId => {
      setSelectedProvider(providerId);
    },
    [setSelectedProvider],
  );

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePiker(OldState => !OldState);
  }, [setShowDatePiker]);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePiker(false);
      }
      if (date) {
        setSelectedDate(date);
        setSelectedHour(0);
      }
    },
    [setShowDatePiker, setSelectedHour],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleGoCreadAppoint = useCallback((hour: number) => {
    navigate('AppointmentCreated', { date: new Date().getTime() });
  }, []);

  const handleCreateAppoint = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setMilliseconds(0);
      console.log({
        providerId: selectedProvider,
        date,
      });

      await api.post('appointments', {
        providerId: selectedProvider,
        date: date.toString(),
      });
      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Erro ao criar um agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente. ',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a Data</Title>

          <OpenDatePikerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra Data
            </OpenDatePickerButtonText>
          </OpenDatePikerButton>

          {showDatePiker && (
            <DateTimePicker
              textColor="#f4ede8"
              onChange={handleDateChanged}
              display="calendar"
              mode="date"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour && available}
                  onPress={() => handleSelectHour(hour)}
                  available={available}
                  key={hourFormatted}
                >
                  <HourText selected={selectedHour === hour && available}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, hour, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour && available}
                    available={available}
                    key={hourFormatted}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText selected={selectedHour === hour && available}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>

          <CreatedAppointmentButton onPress={handleCreateAppoint}>
            <CreatedAppointmentButtonText>Agendar</CreatedAppointmentButtonText>
          </CreatedAppointmentButton>

          <Button type="button" onPress={handleGoCreadAppoint}>
            go
          </Button>
        </Schedule>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
