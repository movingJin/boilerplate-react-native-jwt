import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Image} from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { FlashList } from "@shopify/flash-list";

export default class News extends Component {

  constructor(){
    super();
    this.state={
      datas: [
        {title: "제목1", body:"본문1", issue_date: '2024-02-04', publisher: '동아일보', author:'이동진', img:'require(그림경로)'},
        {title: "제목2", body:"본문2", issue_date: '2024-02-04', publisher: '조선일보', author:'박지연', img:'require(그림경로)'}
      ],
      isModalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  };

  render() {
    return (
      <View style={style.root}>
        <Text style={style.titleText}>Real Estate News</Text>
        <FlashList
          data={this.state.datas}
          renderItem={this.renderItem}
          estimatedItemSize={200}
        />
        {/* {this.state.isModalVisible ? this.popupItem() : null} */}
        {this.state.isModalVisible &&
          <Modal
            visible={this.state.isModalVisible}
            transparent={true}
            animationType='slide'
            onRequestClose={this.toggleModal}
          >
            <View style={style.modelStyle}>
              <View style={style.modelWrapperStyle}>
                <Text style={style.itemTitle}>제목</Text>
                <Text style={style.itemBody}>본문</Text>
              </View>
            </View>
          </Modal>
        }
      </View>
    );
  }

  renderItem=({item})=>{
    return(
      <TouchableOpacity style={style.itemView} onPress={this.toggleModal}>
          {/* <Image source={item.img} style={style.itemImg}></Image> */}
          <View style={{flexDirection:'column'}}>
              <Text style={style.itemTitle}>{item.title}</Text>
              <Text style={style.itemBody}>{item.body}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={style.itemPublisher}>{item.publisher}</Text>
                <Text style={style.itemIssueDate}>{item.issue_date}</Text>
              </View>
          </View>
          
      </TouchableOpacity>
    );
  }

  popupItem=(item)=>{
    //console.log(item);
    console.log("popupItem");
    <Modal
      visible={this.state.isModalVisible}
      transparent={true}
      animationType='slide'
      onRequestClose={this.toggleModal}
    >
      <View style={{flexDirection:'column'}}>
        <Text style={style.itemTitle}>{item.title}</Text>
        <Text style={style.itemBody}>{item.body}</Text>
      </View>
    </Modal>
  }
}

const style= StyleSheet.create({
  root:{flex:1, padding:16,},
  titleText:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    paddingBottom:16,
  },
  itemView:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:4,
    padding:8,
    marginBottom:12,
  },
  itemImg:{
    width:120,
    height:100,
    resizeMode:'cover',
    marginRight:8,
  },
  itemTitle:{
    fontSize:18,
    fontWeight:'bold',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    width: '90%'
  }
});
