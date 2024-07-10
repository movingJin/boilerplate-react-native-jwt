// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";

// import { HomeTapNavigator } from "./HomeTabNavigator";
// import AuthPage from "../pages/AuthPage";
// import SignUpPage from "../pages/SignUpPage";
// import SplashPage from "../pages/SplashPage";
// import ResendMailPage from "../pages/ResendMailPage";

// const AuthStackNavigator = ({navigation}) => {
//     const Stack = createStackNavigator();

//     return (
//         <Stack.Navigator>
//             <Stack.Screen name='SplashPage' component={SplashPage} options={{ headerShown: false}} navigation={navigation}/>
//             <Stack.Screen name='AuthPage' component={AuthPage} options={{ headerShown: false}} navigation={navigation}/>
//             <Stack.Screen name='HomeTab' component={HomeTapNavigator} options={{ headerShown: false }}/>
//             <Stack.Screen name='SignUpPage' component={SignUpPage} options={{ headerShown: false}}/>
//             <Stack.Screen name='ResendMailPage' component={ResendMailPage} options={{ headerShown: false}}/>
//         </Stack.Navigator>
//   );
// }

// export { AuthStackNavigator };


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import FindPwdPage from './FindPwdPage';
import FindEmailPage from './FindEmailPage';
import FindEmailResultPage from './FindEmailResultPage';
import ModifyInfoPage from './ModifyInfoPage';
import HomeTab from '../HomeTab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SettingPage from '../settings/SettingPage'
import About from '../settings/About';
// import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={LoginPage} options={{title: '로그인'}}/>
        <Stack.Screen name="Signup" component={SignupPage} options={{title: '회원가입'}}/>
        <Stack.Screen name="FindPwd" component={FindPwdPage} options={{title: '임시비밀번호 전송'}}/>
        <Stack.Screen name="FindEmail" component={FindEmailPage} options={{title: 'E-Mail(Id) 찾기'}}/>
        <Stack.Screen name="FindEmailResult" component={FindEmailResultPage} options={{title: 'E-Mail(Id) 찾기'}}/>
        <Stack.Screen name="Main" component={HomeTab}
          options={({ navigation }) => ({
            //headerShown: false
            title: 'Info Desk',
            headerLeft: false,
            headerRight: () => (
              <Icon 
                name="settings"
                size={24}
                onPress={() => navigation.navigate('Settings')} />
            ),
          })}/>
          <Stack.Screen name="ModifyInfo" component={ModifyInfoPage} options={{title: '회원정보 수정'}}/>
        <Stack.Screen name="Settings" component={SettingPage} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigator;