import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../reduxToolkit/slice/userSlice';
import Toast from 'react-native-toast-message';
import { addCurrentUser } from '../../reduxToolkit/slice/localSlice';

const SignIn = props => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [no, setNo] = useState();
  const [pass, setPass] = useState();
  const [isValidNo, setisValidNo] = useState(true);
  const [isValidMail, setisValidMail] = useState(true);


  const dispatch = useDispatch();

  const mobileNumberRegex = /^[0-9]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


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

  const setmail = txt => {
    if (!txt) {
      setisValidMail(true);
    }
    setEmail(txt);
    if (emailRegex.test(txt)) {
      setisValidMail(true);
    } else {
      setisValidMail(false);
    }
  }

  const setPassword = txt => {
    setPass(txt);
  };

  const showToast = (type, text ) => {
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
  const data = useSelector(state => state.userSlice);
  const submitPress = () => {
    Keyboard.dismiss();
    if (name && no && email && pass && isValidNo && isValidMail) {
      const isPhonePresent = data.some(item => item && item.phone === no);
      if (isPhonePresent) {
        showToast('success', 'Account already Created! Please login')
        props.navigation.navigate('Login')
      } else {
        const dt = {name: name, phone: no, email: email, password: pass}
        dispatch(addUser(dt));
        showToast('success', 'Account Created');
        props.navigation.navigate('BottomNavigator')
        dispatch(addCurrentUser(no));
      }
    } else {
      showToast('error', 'Please fill all the details correctly')
    }
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 24, color: Colors.royalBlue, marginBottom: 10}}>
        Create account
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={txt => setmail(txt)}
      />
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
          <Text style={{fontSize: 14, color: Colors.white, textAlign: 'center'}}>Submit</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.replace('Login')}>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.dodgerBlue,
              marginVertical: 10,
            }}>
            Already have an account? Login
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignIn;

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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
