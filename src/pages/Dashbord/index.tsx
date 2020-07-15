import React from 'react';
import { View, Button } from 'react-native';

// import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Dashbord: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="sair" onPress={signOut} />
    </View>
  );
};

export default Dashbord;
