import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTab from '../HomeTab';
import SettingDrawer from './SettingDrawer';


const Drawer = createDrawerNavigator();

const SettingDrawerNavigator = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Body"
    >
      <Drawer.Screen name="Body" component={HomeTab} options={{
        drawerLabel: 'BODY',
        title: "Info Desk",
        drawerItemStyle: {
            display: 'none'
          }}} />
      <Drawer.Screen name="Setting" component={SettingDrawer} options={{drawerLabel: 'SETTING'}} />
    </Drawer.Navigator>
  );
}

export default SettingDrawerNavigator;