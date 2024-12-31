import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import UserScreen from './screens/UserScreen';
import KilavuzAP from './screens/kilavuz_ap';
import KilavuzCilv from './screens/kilavuz_cilv';
import KilavuzOS from './screens/Kilavuz_os';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="KilavuzAP" component={KilavuzAP} />
        <Stack.Screen name="KilavuzCilv" component={KilavuzCilv} />
        <Stack.Screen name="KilavuzOS" component={KilavuzOS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
