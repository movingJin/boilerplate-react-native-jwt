/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {View, PanResponder} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/auth/AuthStackNavigator';
import {signOut} from './src/utils/tokenUtils'
import authStore from './src/utils/authStore';
import Toast from 'react-native-toast-message';

const TIME_TO_WAIT_FOR_INACTIVITY_MS = 1000 * 60 * 1000;
const INACTIVITY_CHECK_INTERVAL_MS = 500;

class App extends Component {
  state = {};
  _lastInteraction = new Date();
  _panResponder = {};

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    });
    this._maybeStartWatchingForInactivity();
  }

  _maybeStartWatchingForInactivity = () => {
    if (this._inactivityTimer) {
      return;
    }
    
    this._inactivityTimer = setInterval(() => {
      if (
        new Date().getTime() - this._lastInteraction.getTime() >= TIME_TO_WAIT_FOR_INACTIVITY_MS
      ) {
        this._setIsInactive();
      }
    }, INACTIVITY_CHECK_INTERVAL_MS);
  };

  // NOTE: you almost certainly want to throttle this so it only fires
  // every second or so!
  _setIsActive = () => {
    this._lastInteraction = new Date();
    if (this.state.timeWentInactive) {
      this.setState({ timeWentInactive: null });
    }
    this._maybeStartWatchingForInactivity();
    console.log("active");
  };

  _setIsInactive = () => {
    this.setState({ timeWentInactive: new Date() });
    clearInterval(this._inactivityTimer);
    this._inactivityTimer = null;
    if(authStore.getState().accessToken){
      signOut(null);
    }
    console.log("inactive");
  };

  handleStartShouldSetPanResponder = () => {
    if(authStore.getState().accessToken){
      this._setIsActive();
    }
    return false;
  };

  handleMoveShouldSetPanResponder = () => {
    if(authStore.getState().accessToken){
      this._setIsActive();
    }
    return false;
  };

  render(){
    return (
      <>
        <View
        style={{ flex: 1 }}
        {...this._panResponder.panHandlers}>
          <NavigationContainer>
            <AuthStackNavigator />
          </NavigationContainer>
          <Toast />
        </View>
      </>
    );
  }
};

export default App;
