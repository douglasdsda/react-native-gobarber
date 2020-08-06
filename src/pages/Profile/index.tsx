import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';

// import { Container } from './styles';

const Profile: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <View>
      <Button onPress={signOut}>Deslogar</Button>
    </View>
  );
};

export default Profile;
