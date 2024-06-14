/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {Node} from 'react';
import AuthStackNavigator from './src/auth/AuthStackNavigator';
import Toast from 'react-native-toast-message';

import {View} from 'react-native';

class App extends Component {
  render(){
    return (
      <>
        <View style={{ flex: 1 }}>
          <AuthStackNavigator />
          <Toast />
        </View>
      </>
    );
  }
};

export default App;
