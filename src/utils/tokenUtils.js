import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const URL = 'http://192.168.0.3:58083'

const showToast = (text) =>{
    Toast.show({
        type: 'error',
        position: 'bottom',
        text1: text,
      });
};

export const signIn = async (email, password, navigation) => {
    try {
      const response = await axios.post(`${URL}/login`, { email, password });
      console.log(response.data);
      await AsyncStorage.setItem('jwtToken', response.data.tokens.accessToken);
      if (response.status === 200){
        AsyncStorage.setItem('Tokens', JSON.stringify({
          'accessToken': response.data.tokens.accessToken,
          'refreshToken': response.data.tokens.refreshToken,
          'email': response.data.email
        }))
        navigation.navigate('Main');
      }
    } catch (error) {
      if(error.response.status === 401){
          showToast(error.response.data)
      }
      else{
          showToast("Ukown error")
      }
    }
};

export const signOut = async (navigation, _setIsAuthenticated) => {
  const localData = await AsyncStorage.getItem("Tokens");
  const tokens = JSON.parse(localData);
  console.log(tokens.accessToken);
  const response = await axios.post(`${URL}/signout`, {}, {headers: {'Authorization': "Bearer " + tokens.accessToken}});
  if (response.status === 200){
    await AsyncStorage.removeItem('Tokens');
    _setIsAuthenticated(false);
  }
};

const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem("Tokens");
    if (value !== null) {
      return JSON.parse(value)
    }
    else{
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};


export const verifyTokens = async (navigation) => {
  const Token = await getTokenFromLocal();

  // 최초 접속
  if (Token === null){
    navigation.reset({routes: [{name: "AuthPage"}]});
  }
  // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증 
  else{
    const headers_config = {
      "refresh": Token.refreshToken,
      Authorization: `Bearer ${Token.accessToken}`   
    };

    try {
      const res = await axios.get(`${URL}/refresh`, {headers: headers_config})

      // accessToken 만료, refreshToken 정상 -> 재발급된 accessToken 저장 후 자동 로그인
      AsyncStorage.setItem('Tokens', JSON.stringify({
        ...Token,
        'accessToken': res.data.data.accessToken,
      }))
      navigation.reset({routes: [{name: "Main"}]});

    } catch(error){
      const code = error.response.data.code; 

      // accessToken 만료, refreshToken 만료 -> 로그인 페이지
      if(code === 401){
        navigation.reset({routes: [{name: "AuthPage"}]});
      }
      // accessToken 정상, refreshToken 정상 -> 자동 로그인
      else{
        navigation.reset({routes: [{name: "Main"}]});
      }
    }

  }
};