import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from './Map'
import News from './News'
import GptNews from './GptNews'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Map' component={Map} />
            <Tab.Screen name='News' component={News} />
            <Tab.Screen name='GptNews' component={GptNews} />
            {/* <Tab.Screen name='Settings' component={Settings} /> */}
        </Tab.Navigator>
    );
};

export default TabNavigation;