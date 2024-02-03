/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState, useEffect} from 'react';
import {Node} from 'react';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

class Map extends Component{

  async componentDidMount(){
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLogitude] = useState(null);
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    if (granted) {
      // Geolocation.getCurrentPosition(
      //   position => {
      //     const latitude = JSON.stringify(position.coords.latitude);
      //     const longitude = JSON.stringify(position.coords.longitude);

      //     setLatitude(latitude);
      //     setLogitude(longitude);
      //   },
      //   error => {
      //     console.log(error.code, error.message);
      //   },
      //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      // );
    } 
    else {
      console.log( "ACCESS_FINE_LOCATION permission denied" );
    }
  }
  render() {
    return (
      <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
          latitude: 37.57002,
          longitude: 126.97962,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
      />
    );
  }
}

export default Map;
