import {Text, SafeAreaView, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import { useSelector } from 'react-redux';

const Profile = props => {
  const users = useSelector(state => state.userSlice)
  const data = useSelector(state => state.localSlice);
  const myuser = users?.find(item => item?.phone === data);;
  console.log('datadata', myuser);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} title={'Profile'} logout={true} />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Image
          source={require('../../res/images/profile.png')}
          style={{height: 150, width: 150, marginVertical: 20}}
        />
        <Text style={styles.boldtxt}>Name: {myuser?.name}</Text>
        <Text style={styles.normalTxt}>email: {myuser?.email}</Text>
        <Text style={styles.normalTxt}>Phone: {myuser?.phone}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  boldtxt: {fontSize: 20, color: Colors.royalBlue, fontWeight: 'bold'},
  normalTxt: {fontSize: 16, color: Colors.black},
});
