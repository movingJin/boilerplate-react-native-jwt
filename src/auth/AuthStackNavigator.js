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
import HomePage from './HomePage';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigator;