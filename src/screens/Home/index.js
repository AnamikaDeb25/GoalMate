import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import EditIco from '../../res/svg/edit.svg';
import AddIco from '../../res/svg/add.svg';

const Home = props => {
  const data = useSelector(state => state.appSlice);
  const list = data?.list;

  const renderItems = data => {
    const item = data?.item;
    const isTask = item?.taskList?.length > 0;
    return (
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('AllGoals')}>
        <View style={styles.view}>
          <Text style={{color: Colors.darkBlue, fontSize: 14, flex: 1}}>
            {item?.title}
          </Text>
          {isTask ? <EditIco /> : <AddIco />}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} />
      <FlatList data={list} renderItem={renderItems} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  view: {
    backgroundColor: Colors.veryLightBlue,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
  },
});
