/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import carSvg from './assets/svgs/carSvg';
import clockSvg from './assets/svgs/clockSvg';
import SpeechToFunction from './components/SpeechToFunction';
import HomeScreen from './screens/HomeScreen';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const MiddleButton = ({ onPress }: { onPress: any }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Add Function</Text>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: carSvg }} />
        <Tab.Screen name="Add Function" component={SpeechToFunction} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: clockSvg }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
