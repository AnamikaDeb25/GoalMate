import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  removeTask,
  updateTask,
} from '../../reduxToolkit/slice/appSlice';
import DeleteIco from '../../res/svg/delete.svg';
import TickIco from '../../res/svg/tick.svg';
import Toast from 'react-native-toast-message';
import { Keyboard } from 'react-native';
// import NO_DATA_IMG from ;

const AllGoals = props => {
  const [text, settext] = useState('');
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const id = getFormattedDate();

  const dispatch = useDispatch();
  const data = useSelector(state => state.appSlice.list);
  const dt = data.find(item => item?.id === id);
  const list = dt?.taskList;
  const countDoneTasks =
    list?.length > 0 ? list?.filter(task => task?.done)?.length : 0;


  const setData = () => {
    Keyboard.dismiss();
    console.log('text.trim()text.trim()', text.trim());
    if (text.trim()) {
      dispatch(addTask({task: text, done: false}));
      settext('');
      showToast('success', 'You have successfully created your task 🥳');
    } else {
      showToast('error', 'You haven’t write any tasks yet. 😔');
    }
  };

  const noDataView = () => {
    return (
      <View style={styles.noData}>
        <Text style={styles.text}>Oops! We couldn't find any data.</Text>
        <Text style={styles.text}>
          Why not add your task here to get started?
        </Text>
      </View>
    );
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

  const donePress = val => {
    console.log('listlist', val);
    dispatch(
      updateTask({task: val?.item?.task, done: true, taskIndex: val?.index}),
    );
  };
  const dltPress = val => {
    console.log('listlist', val);
    dispatch(removeTask({taskIndex: val?.index}));
  };
  const renderItems = data => {
    const item = data?.item;
    return (
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('AllGoals', {id: item?.id})}>
        <View
          style={[
            styles.view,
            {backgroundColor: item?.done ? '#9cff9c' : Colors.veryLightBlue},
          ]}>
          <Text style={{color: Colors.darkBlue, fontSize: 14, flex: 1}}>
            {item?.task}
          </Text>
          <TouchableWithoutFeedback onPress={() => dltPress(data)}>
            <View style={{paddingHorizontal: 7}}>
              <DeleteIco />
            </View>
          </TouchableWithoutFeedback>
          {item?.done ? null : (
            <TouchableWithoutFeedback onPress={() => donePress(data)}>
              <View style={{paddingHorizontal: 7}}>
                <TickIco />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const addTaskView = () => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add your task here"
          placeholderTextColor="#888"
          value={text}
          onChangeText={txt => settext(txt)}
        />
        <TouchableWithoutFeedback onPress={setData}>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.saveBtn}>Save</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const title =
    countDoneTasks > 0
      ? `${countDoneTasks} of ${dt?.taskList?.length} Goals Accomplished!🥳`
      : dt?.taskList?.length > 0
      ? `You haven't completed any tasks so far.`
      : `Ready to dive in?`;

  return (
    <View>
      <Header
        navigation={props.navigation}
        title={title}
        subTitle={countDoneTasks > 0 ? 'Progress Report:' : 'Heyy!!'}
      />
      {addTaskView()}
      <FlatList data={list} renderItem={renderItems} />
      {dt?.taskList?.length > 0 ? null : noDataView()}
    </View>
  );
};

export default AllGoals;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    borderColor: Colors.royalBlue,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: Colors.royalBlue,
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  noData: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: Colors.black, textAlign: 'center', paddingHorizontal: 30},
  view: {
    backgroundColor: Colors.veryLightBlue,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 16,
  },
});
