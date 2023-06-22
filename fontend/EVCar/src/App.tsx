/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomeScreen from './screens/HomeScreen';
import RecordingScreen from './screens/RecordingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './components/BottomNavigator';
import SpeechRecognition from './components/SpeechRecognition';

const Stack = createStackNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomNavigator' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Recording" component={RecordingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
