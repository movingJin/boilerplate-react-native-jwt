import React from "react";

import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from "@react-navigation/drawer";
import HomeTab from './HomeTab';
import SettingDrawer from './settings/SettingDrawer';
import { Button, TextInput, View } from 'react-native';
import { signOut } from './utils/tokenUtils';

const Drawer = createDrawerNavigator();

const LogoutDrawerContent = (props) =>{
  return (
     <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
       {/*all of the drawer items*/}
       <DrawerItemList {...props}  style={{borderWidth:1}}/>
       <View style={{flex:1,marginVertical:20,borderWidth:1}}>
         {/* here's where you put your logout drawer item*/}
         <DrawerItem 
           label="Logout"
           onPress={()=>signOut(props.navigation)}
           style={{flex:1,justifyContent:'flex-end'}}
         />
       </View>
     </DrawerContentScrollView>
   );
 }

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <LogoutDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeTab} options={{
        title: "Info Desk",
        drawerItemStyle: {
            display: 'none'
          }}} />
      <Drawer.Screen name="Setting" component={SettingDrawer} options={{drawerLabel: 'SETTING'}} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;