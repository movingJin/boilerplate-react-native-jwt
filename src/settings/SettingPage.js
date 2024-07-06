import React, {Component, useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { signOut } from '../utils/tokenUtils';
import authStore from '../utils/authStore';

export default class SettingPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: false
        };
    }
    
    componentDidMount(){
        const {accessToken} = authStore.getState();
        if (accessToken === null) {
            this.setState({isAuthenticated: false});
        } else {
            this.setState({isAuthenticated: true});
        }
    }
    componentDidUpdate(prevProps){
        if(this.state.isAuthenticated !== prevProps.isAuthenticated){

        }
    }
    componentWillUnmount(){

    }

    _setIsAuthenticated  = (isAuthenticated) => {
        this.setState({isAuthenticated: isAuthenticated});
    }

    _goToAbout(){
        this.props.navigation.navigate('About');
    }

    _goToLogIn(){
        this.props.navigation.navigate('Login');
    }

    _goSignUp(){
        this.props.navigation.navigate('Signup');
    }

    _goModifyInfo(){
        this.props.navigation.navigate('ModifyInfo');
    }

    _checkLogout(){
        Alert.alert(
            "Alert",
            "Are you sure?",
            [
                {text: 'ok', onPress: () => signOut(this.props.navigation, this._setIsAuthenticated)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._goToAbout.bind(this)}>
                    <Text>🏅 모두의 전세에 대해서</Text>
                </TouchableOpacity>
                {this.state.isAuthenticated ? (<>
                    <TouchableOpacity 
                        style={styles.wrapButton}
                        onPress={this._goModifyInfo.bind(this)}>
                        <Text>회원정보 수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.wrapButton}
                        onPress={this._checkLogout.bind(this)}>
                        <Text>🔓 로그아웃</Text>
                    </TouchableOpacity>
                </>) : (<>
                    <TouchableOpacity 
                        style={styles.wrapButton}
                        onPress={this._goToLogIn.bind(this)}>
                        <Text>🔑 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.wrapButton}
                        onPress={this._goSignUp.bind(this)}>
                        <Text>회원가입</Text>
                    </TouchableOpacity>
                </>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapButton: {
        width: wp('100%'),
        height: hp('8%'),
        paddingLeft: wp('2%'),
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    }
})