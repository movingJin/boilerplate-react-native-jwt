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
import MainDrawerNavigator from '../MainDrawerNavigator';
// import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

// const AuthStackNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="Home" component={HomeTab}
//           options={({ navigation }) => ({
//             title: 'Info Desk',
//             headerLeft: (/*navigation*/) => (
//               <IconButton
//                 icon="menu"
//                 onPress={() => console.log("testbug0")/*navigation.openDrawer()*/}
//               />
//             ),
//           })}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };


const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Main" component={MainDrawerNavigator}
          options={() => ({
            headerShown: false
            // title: 'Info Desk',
            // headerLeft: false
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigator;