import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Image} from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { FlashList } from "@shopify/flash-list";

class Item {
  constructor({title, body, issueDate, publisher, author, img}){
    this.title = title;
    this.body = body;
    this.issueDate = issueDate;
    this.publisher = publisher;
    this.author = author;
    this.img = img;
  }
}

export default class News extends Component {

  constructor(){
    super();
    this.state={
      datas: [
        {title: "제목1", body:"본문1", issueDate: '2024-02-04', publisher: '동아일보', author:'이동진', img:'require(그림경로)'},
        {title: "제목2", body:"본문2", issueDate: '2024-02-04', publisher: '조선일보', author:'박지연', img:'require(그림경로)'}
      ],
      isModalVisible: false,
      selectedItem: null
    };
  }

  toggleModal = (item=null) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
    this.setState({selectedItem: item});
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
        {this.state.isModalVisible && this.popupItem()}
      </View>
    );
  }

  renderItem=({item})=>{
    return(
      <TouchableOpacity style={style.itemView} onPress={() => this.toggleModal(item)}>
          {/* <Image source={item.img} style={style.itemImg}></Image> */}
          <View style={{flexDirection:'column'}}>
              <Text style={style.itemTitle}>{item.title}</Text>
              <Text style={style.itemBody}>{item.body}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={style.itemPublisher}>{item.publisher}</Text>
                <Text style={style.itemIssueDate}>{item.issueDate}</Text>
              </View>
          </View>
          
      </TouchableOpacity>
    );
  }

  popupItem=()=>{
    return(
    // <Modal
    //   visible={this.state.isModalVisible}
    //   transparent={true}
    //   animationType='slide'
    //   onRequestClose={this.toggleModal}
    // >
    //   <View style={{flexDirection:'column'}}>
    //     <Text style={style.itemTitle}>{this.state.selectedItem.title}</Text>
    //     <Text style={style.itemBody}>{this.state.selectedItem.title}</Text>
    //   </View>
    // </Modal>
      <Modal
      visible={this.state.isModalVisible}
      transparent={true}
      animationType='slide'
      onRequestClose={() => this.toggleModal(null)}
      >
        <View style={style.modelStyle}>
          <View style={style.modelWrapperStyle}>
            <Text style={style.itemTitle}>{this.state.selectedItem.title}</Text>
            <Text style={style.itemBody}>{this.state.selectedItem.body}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={style.itemPublisher}>{this.state.selectedItem.publisher}</Text>
              <Text style={style.itemIssueDate}>{this.state.selectedItem.issueDate}</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
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
