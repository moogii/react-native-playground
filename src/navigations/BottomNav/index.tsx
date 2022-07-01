import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/Home";
import OtherScreen from '../../screens/Other';
import { NavigationTab } from './components';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <NavigationTab {...props} />}
      initialRouteName="Home">
      <Tab.Screen name="Bar" component={OtherScreen} />
      <Tab.Screen name="More" component={OtherScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={OtherScreen} />
      <Tab.Screen name="Profile" component={OtherScreen} />
    </Tab.Navigator>
  );
}

export default BottomNav;