import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import {addCurrentUser} from '../reduxToolkit/slice/localSlice';
import {useDispatch} from 'react-redux';
const Header = props => {
  const headerText = props?.title || 'Task list';
  const text = props?.subTitle ?? 'Your';
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(addCurrentUser(null));
    props.navigation.navigate('Login');
  };
  return (
    <View style={styles.rowContainer}>
      <View style={{flex: 1}}>
        <Text style={styles.headerTxt2}>{text}</Text>
        <Text style={styles.headerTxt}>{headerText}</Text>
      </View>
      {props?.logout ? (
        <TouchableWithoutFeedback onPress={logout}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}>
            <Text style={styles.headerTxt3}>Logout</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    backgroundColor: Colors.royalBlue,
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerTxt2: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: Colors.white,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  headerTxt: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: Colors.white,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  headerTxt3: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: Colors.royalBlue,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
});
