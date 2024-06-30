import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import authStore from './authStore';

const URL = 'http://192.168.0.3:58083'

const showToast = (type, text) =>{
    Toast.show({
        type: type,
        position: 'bottom',
        text1: text,
      });
};

const {setAccessToken, setRefreshToken, setEmail, clearTokens} = authStore.getState();

export const signIn = async (email, password, navigation) => {
    try {
      const response = await axios.post(`${URL}/login`, { email, password });
      console.log(response.data);
      //await AsyncStorage.setItem('jwtToken', response.data.tokens.accessToken);
      if (response.status === 200){
        setAccessToken(response.data.tokens.accessToken);
        setRefreshToken(response.data.tokens.refreshToken);
        setEmail(response.data.email);
        navigation.navigate('Main');
      }
    } catch (error) {
      if(error.response.status === 401){
          showToast("error", "등록되지 않은 이용자정보입니다.");
      }
      else{
          showToast("error", "Ukown error");
      }
    }
};

export const signOut = async (navigation, _setIsAuthenticated) => {
  const accessToken = authStore.getState().accessToken;
  console.log(accessToken);
  const response = await axios.post(`${URL}/signout`, {}, {headers: {'Authorization': "Bearer " + accessToken}});
  if (response.status === 200){
    clearTokens();
    _setIsAuthenticated(false);
  }
};

export const sendAuthCode = async (email) => {
  try {
    showToast("success", `${email} 로 인증코드를 전송했습니다. 30분 내로 메일이 도착합니다.`);
    const response = await axios.post(`${URL}/emails/send-authcode`, {email});
    if (response.status === 200){
    }
  }catch (error) {
    console.log(error.response);
  }
};

export const signUp = async (email, name, phone, code, password, navigation) => {
  try {
    const response = await axios.post(`${URL}/register`, {email, name, phone, code, password});
    console.log(response);
    if (response.status === 200){
      showToast("success", "회원가입이 완료되었습니다!");
      navigation.navigate('Login');
    }
  }catch (error) {
    if(error.response.data.message === "Member already registered."){
      showToast("error", "이미 등록된 E-Mail 입니다.");
    }else if(error.response.data.message === "Auth code is not valid."){
      showToast("error", "인증코드가 유효하지 않습니다.");
    }
  }
};

export const findEmail = async (phone, code, navigation) => {
  try {
    const response = await axios.post(`${URL}/find-email`, {phone, code});
    console.log(response.data);
    if (response.status === 200){
      navigation.navigate('FindEmailResult', {email: response.data});
    }
  }catch (error) {
    console.log(error.response);
    if (error.response.status === 401){
      showToast("error", "등록되지 않은 이용자정보입니다.");
    }
    if(error.response.data.message === "Auth code is not valid."){
      showToast("error", "인증코드가 유효하지 않습니다.");
    }
  }
};

export const findPwd = async (email, phone, code, navigation) => {
  try {
    const response = await axios.post(`${URL}/find-pwd`, {email, phone, code});
    console.log(response);
    if (response.status === 200){
      showToast("success", "가입된 E-Mail로 임시비밀번호가 발송되었습니다!");
      navigation.navigate('Login');
    }
  }catch (error) {
    console.log(error.response);
    if (error.response.status === 401){
      showToast("error", "등록되지 않은 이용자정보입니다.");
    }
    if(error.response.data.message === "Auth code is not valid."){
      showToast("error", "인증코드가 유효하지 않습니다.");
    }
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