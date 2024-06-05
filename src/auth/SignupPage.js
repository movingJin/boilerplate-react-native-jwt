import React, { useState, createRef } from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendAuthCode, signUp } from '../utils/tokenUtils';

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [userName, setUserName] = useState('');
  const [authCode, setAuthCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [errortext2, setErrortext2] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const emailInputRef = createRef();
  const codeInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordChkInputRef = createRef();
  const nameInputRef = createRef();

  return (
    // <View>
    //   <TextInput placeholder="E-mail" onChangeText={setEmail} />
    //   <TextInput placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
    //   <Button title="Login" onPress={() => signIn(email, password, navigation)} />
    // </View>
    <View style={styles.container}>
      <View style={styles.formArea}>
        <TextInput
          placeholder={'E-Mail'}
          onChangeText={setEmail}
          ref={emailInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            codeInputRef.current && codeInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <View style={styles.formCode}>
          <TextInput
            placeholder={'보안코드를 입력하세요'}
            onChangeText={setAuthCode}
            ref={codeInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              nameInputRef.current && nameInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          <Button style={styles.sendAuthCode} title="Send Code" onPress={() => sendAuthCode(email)} />
        </View>
        <TextInput
          placeholder={'닉네임'}
          onChangeText={setUserName}
          ref={nameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          secureTextEntry={true}
          placeholder={'비밀번호(8자 이상)'}
          onChangeText={setPassword}
          ref={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordChkInputRef.current && passwordChkInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          secureTextEntry={true}
          placeholder={'비밀번호 확인'}
          onChangeText={setPasswordChk}
          ref={passwordChkInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            nameInputRef.current && nameInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>

      <View style={{flex: 0.5, justifyContent: 'center'}}>
      {password !== passwordChk ? (
        <Text style={styles.TextValidation}>
          비밀번호가 일치하지 않습니다.
        </Text>
      ) : null}
      </View>
      <Button style={{color: 'white', fontSize: wp('4%')}} title="Sign Up" onPress={() => signUp(email, userName, authCode, password)}></Button>
      {/* <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={signUp}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formArea: {
    flex: 1
  },
  formCode: {
    flexDirection: 'row'
  },
  sendAuthCode: {
    width: wp('10%'),
    paddingLeft: wp('2%')
  },
  TextValidation: {
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    paddingBottom:16
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

export default SignupPage;