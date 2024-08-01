import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Home from '../screens/Home';
import HomeIco from '../res/svg/home_inactive.svg';
import HomeIcoActive from '../res/svg/home_active.svg';
import ProfileIco from '../res/svg/profile_inactive.svg';
import ProfileIcoActive from '../res/svg/profile_active.svg';
import Colors from '../styles/Colors';
import Profile from '../screens/Profile';
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: styles.tabBarStyle,
  };

  const textView = (text, focused) => {
    return (
      <Text
        allowFontScaling={false}
        style={focused ? styles.selectedText : styles.normalText}>
        {text}
      </Text>
    );
  };

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.icoStyle}>
                {focused ? <HomeIcoActive /> : <HomeIco />}
                {textView('Home', focused)}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.icoStyle}>
                {focused ? <ProfileIcoActive /> : <ProfileIco />}
                {textView('Profile', focused)}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevetion: 0,
    height: 50,
    alignItems: 'center',
  },
  icoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.royalBlue,
  },
  normalText: {
    fontSize: 12,
    fontWeight: Platform.OS === 'android' ? 'normal' : null,
    color: Colors.black,
  },
});
