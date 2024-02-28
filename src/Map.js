/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState, useEffect} from 'react';
import {Pressable, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal, Image} from 'react-native';
import {Node} from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon} from "react-native-maps";
import { FlashList } from "@shopify/flash-list";
import coords from "../gu.json"

class Map extends Component{
  constructor(props){
    super(props);
    this.state={
      datas: [
        {header: "제목1", body:"본문1", issueDate: '2024-02-04', publisher: '동아일보', author:'이동진', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'박지연', img:'require(그림경로)'}
      ],
      isModalVisible: false
    };
  }

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
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  };

  render() {
    const gus = Object.keys(coords);
    return (
      <View style={style.root}>
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
        {this.state.isModalVisible && this.popupItem()}
      </View>
    );
  }

  popupItem=()=>{
    return(
      <Modal
      visible={this.state.isModalVisible}
      transparent={true}
      animationType='slide'
      onRequestClose={() => this.toggleModal()}
      >
        <TouchableOpacity style={style.modelStyle} onPress={() => this.setState({isModalVisible: false})}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={style.modelWrapperStyle}>
              <Text style={style.itemHeader}>헤더</Text>
              <Text style={style.itemBody}>바디</Text>
              <FlashList
                data={this.state.datas}
                //keyExtractor={()=>{}}
                renderItem={this.renderItem}
                estimatedItemSize={200}
                />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderItem=({item})=>{
    return(
      <TouchableOpacity style={style.listView} onPress={() => this.toggleModal(item)}>
          {/* <Image source={item.img} style={style.listImg}></Image> */}
          <View style={{flexDirection:'column'}}>
              <Text style={style.listHeader}>{item.header}</Text>
              <Text style={style.itemBody}>{item.body}</Text>
              <View style={style.footer}>
                <Text style={style.itemPublisher}>{item.publisher}</Text>
                <Text style={style.itemIssueDate}>{item.issueDate}</Text>
              </View>
          </View>
          
      </TouchableOpacity>
    );
  }
}

const style= StyleSheet.create({
  root:{flex:1},
  titleText:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    paddingBottom:16
  },
  listView:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:4,
    padding:8,
    marginBottom:12
  },
  listImg:{
    width:120,
    height:100,
    resizeMode:'cover',
    marginRight:8
  },
  listHeader:{
    fontSize:18,
    fontWeight:'bold'
  },
  itemBody:{
      fontSize:16
  },
  itemPublisher:{
    fontSize:14,
    marginRight: 8
  },
  itemIssueDate:{
    fontSize:14
  },
  modelStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modelWrapperStyle: {
    backgroundColor: '#ffffff',
    padding: 20,
    width: '80%',
    height: '90%'
  },
  itemHeader:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  footer: {
    flexDirection:'row',
    textAlign: 'left',
    marginTop: 8
  }
});

export default Map;
