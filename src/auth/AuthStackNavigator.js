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
import HomeTab from '../HomeTab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainDrawerNavigator from '../MainDrawerNavigator';
import SettingPage from '../settings/SettingPage'
import About from '../settings/About';
// import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="FindPwd" component={FindPwdPage} />
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
        <Stack.Screen name="Settings" component={SettingPage} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigator;