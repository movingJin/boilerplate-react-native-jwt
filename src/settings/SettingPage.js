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

export default class SettingPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: false
        };
    }
    
    async componentDidMount(){
        const localData = await AsyncStorage.getItem("Tokens");
        if (localData === null) {
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
                    <Text>🏅 About</Text>
                </TouchableOpacity>
                {this.state.isAuthenticated ? (<>
                    <TouchableOpacity 
                        style={styles.wrapButton}
                        onPress={this._checkLogout.bind(this)}>
                        <Text>🔓 Logout</Text>
                    </TouchableOpacity>
                </>) : (<>
                    <TouchableOpacity 
                        style={styles.wrapButton}
                        onPress={this._goToLogIn.bind(this)}>
                        <Text>🔑 Login</Text>
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