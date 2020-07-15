import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashbord from '../pages/Dashbord';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashbord" component={Dashbord} />
  </App.Navigator>
);

export default AppRoutes;
