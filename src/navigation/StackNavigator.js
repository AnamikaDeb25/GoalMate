import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import AllGoals from '../screens/AllGoals';
import Login from '../screens/Login';
import SignIn from '../screens/SignIn';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
const StackNavigator = () => {
  const isLoggedin = useSelector(state => state.localSlice);
  return (
    <Stack.Navigator
      initialRouteName={isLoggedin ? 'BottomNavigator' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllGoals"
        component={AllGoals}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
