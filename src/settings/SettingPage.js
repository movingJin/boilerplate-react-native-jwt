import React, {Component} from 'react';
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
    }

    _navigate(){
        this.props.navigation.navigate('About');
    }

    _checkLogout(){
        Alert.alert(
            "Alert",
            "Are you sure?",
            [
                {text: 'ok', onPress: () => signOut(this.props.navigation)},
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
                    onPress={this._navigate.bind(this)}>
                    <Text>🏅 About</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._checkLogout.bind(this)}>
                    <Text>🔓 Logout</Text>
                </TouchableOpacity>
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