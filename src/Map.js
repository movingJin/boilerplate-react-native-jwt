/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState, useEffect} from 'react';
import {Node} from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon} from "react-native-maps";
import coords from "../gu.json"

class Map extends Component{

  async componentDidMount(){
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLogitude] = useState(null);
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    if (granted) {

    } 
    else {
      console.log( "ACCESS_FINE_LOCATION permission denied" );
    }
  }

  polygonMouseOver = (key) =>{
    console.log(key);
  }

  render() {
    const gus = Object.keys(coords);
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
      >
        {gus.map(gu => (
        <Polygon
          key={gu}
          tappable={true}
          onPress={() => this.polygonMouseOver(gu)}
          coordinates={coords[gu]}
          strokeColor="#000000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWeight="2"
          fillColor="rgba(0,0,255,0.35)"
          fillOpacity="0.35"
        />
        ))}
      </MapView>
    );
  }
}

export default Map;
