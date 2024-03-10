/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/Tab.web';

import {View} from 'react-native';

class App extends Component {
  render(){
    return (
      <>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
              <TabNavigation />
          </NavigationContainer>
        </View>
      </>
    );
  }
};

export default App;