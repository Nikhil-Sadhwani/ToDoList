import React from 'react';
import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='ToDo List' component={Home} />
          <Stack.Screen name='Login' component={Signin} />
          <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


