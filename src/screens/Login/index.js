import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../styles/Colors';
import {Screen} from 'react-native-screens';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {addCurrentUser} from '../../reduxToolkit/slice/localSlice';

const Login = props => {
  const [no, setNo] = useState();
  const [pass, setPass] = useState();
  const [isValidNo, setisValidNo] = useState(true);

  const data = useSelector(state => state.userSlice);
  const isLoggedin = useSelector(state => state.localSlice);
  const dispatch = useDispatch();

  const mobileNumberRegex = /^[0-9]*$/;

  useEffect(() => {
    if (isLoggedin) {
      props.navigation.navigate('BottomNavigator');
    }
  }, []);

  const setNumber = number => {
    if (!number) {
      setisValidNo(true);
    }
    setNo(number);
    if (mobileNumberRegex.test(number)) {
      setisValidNo(true);
    } else {
      setisValidNo(false);
    }
  };
  const setPassword = txt => {
    setPass(txt);
  };

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      position: 'bottom',
      text2: text,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 60,
      text2Style: {
        fontSize: 14,
        color: type === 'error' ? 'red' : 'green',
      },
    });
  };

  const submitPress = () => {
    Keyboard.dismiss();
    const isPhonePresent = data.some(item => item && item.phone === no);
    const isPassPresent = data.some(item => item && item.password === pass);
    if (no && pass && isValidNo && isPhonePresent && isPassPresent) {
      if (isPhonePresent && isPassPresent) {
        showToast('success', 'Login successful');
        dispatch(addCurrentUser(no));
        props.navigation.navigate('BottomNavigator');
      }
    } else {
      showToast('error', 'Please fill all the details correctly');
    }
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 24, color: Colors.royalBlue, marginBottom: 10}}>
        Login to your account
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Your number"
        placeholderTextColor="#888"
        value={no}
        maxLength={10}
        keyboardType={'number-pad'}
        onChangeText={txt => setNumber(txt)}
      />
      {!isValidNo && (
        <Text style={styles.errorText}>Invalid mobile number</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Your password"
        placeholderTextColor="#888"
        value={pass}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableWithoutFeedback onPress={submitPress}>
        <View style={styles.btn}>
          <Text
            style={{fontSize: 14, color: Colors.white, textAlign: 'center'}}>
            Login
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('SignIn')}>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.dodgerBlue,
              marginVertical: 10,
            }}>
            New to Goal Mate? Create account
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    // height: 50,
    borderColor: Colors.royalBlue,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '80%',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  btn: {
    // height: 50,
    backgroundColor: Colors.royalBlue,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '80%',
    marginTop: 20,
    padding: 12,
  },
});
