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
import MapView, { Marker, PROVIDER_GOOGLE, Polygon} from "react-native-maps";
import { FlashList } from "@shopify/flash-list";
import coords from "../gu.json"

class Map extends Component{
  constructor(props){
    super(props);
    this.state={
      datas: [
        {header: "제목1", body:"본문1", issueDate: '2024-02-04', publisher: '동아일보', author:'이동진', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'박지연', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'},
        {header: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'홍길동', img:'require(그림경로)'}
      ],
      points: [
        {key: 1, address: "서울시 영등포구 신길로 15나길 11 (글로리홈)", latitude: 37.4973234106675, longitude: 126.905182497904, last_edit_time: "2024-03-19"},
        {key: 2, address: "서울시 영등포구 신길로 15나길 12 (temp)", latitude: 37.4974318381051, longitude: 126.905340228462, last_edit_time: "2000-01-01"},
        {key: 3, address: "서울시 종로구 종로33길 15 (연강빌딩)", latitude: 37.571812327, longitude: 127.001000105, last_edit_time: "2000-01-01"}
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
          {this.state.points.map(point => (
            <Marker
              key={point.key}
              coordinate={{latitude: point.latitude, longitude: point.longitude}}
              title={point.address}
              description={point.last_edit_time}
              onCalloutPress={() => this.polygonMouseOver(point.address)}
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
