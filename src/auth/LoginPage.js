import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../utils/tokenUtils';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput placeholder="E-mail" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
      <Button title="Login" onPress={() => signIn(email, password, navigation)} />
      <Button title="비밀번호찾기" onPress={() => navigation.navigate('FindPwd')} />
    </View>
  );
};

export default LoginPage;