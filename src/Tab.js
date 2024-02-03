import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Map from './Map'
import News from './News'
import GptNews from './GptNews'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Map'
                component={Map}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="map" color={color} size={size} />
                      )
                }}
                />
            <Tab.Screen
                name='News'
                component={News}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="newspaper" color={color} size={size} />
                      )
                }}
                />
            <Tab.Screen
                name='GptNews'
                component={GptNews}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="article" color={color} size={size} />
                      )
                }}
                />
            {/* <Tab.Screen name='Settings' component={Settings} /> */}
        </Tab.Navigator>
    );
};

export default TabNavigation;