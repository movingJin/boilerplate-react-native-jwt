import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from './About'
// import About from './Settings'


const Stack = createStackNavigator();

export default function SettingDrawer() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}