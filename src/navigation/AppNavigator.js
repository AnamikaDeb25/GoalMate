import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import Colors from '../styles/Colors';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors.royalBlue}
        hidden={false}
        barStyle={'light-content'}
      />
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
