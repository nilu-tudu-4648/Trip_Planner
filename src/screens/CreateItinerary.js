import { SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppButton, AppLoader, AppText, CreateTaskDialog } from '../components'
import { FSTYLES, } from '../constants/theme'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Portal } from 'react-native-paper';
import { formatDate, formatTimestamp } from '../constants/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreateItinerary = ({ route }) => {
  const { data } = route?.params
  const [ItineraryData, setItineraryData] = useState([])
  const [date, setDate] = useState(new Date);
  const [name, setName] = useState("Nilesh");
  const [description, setDescription] = useState("setDescription");
  const [mode, setMode] = useState('date');
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date);
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [isCreateDialogVisible, setisCreateDialogVisible] = useState(false);
  const [editItinaryItem, setEditItinaryItem] = useState(null)
  const ItinaryItem = ({ item }) => {
    return (
      <View style={{ elevation: 2, ...FSTYLES, width: '99%' }}
        className="bg-white self-center p-2 my-2 rounded-md">
        <View style={{ width: '75%' }}>
          <AppText className="text-[16px] text-[#0B646B] font-bold my-2">{item.name}</AppText>
          <AppText className="text-[12px] text-[#0B646B] font-bold my-2">{item.description}</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText className="text-[12px] text-[#0B646B] font-bold my-2">{formatDate(item.date)}    {formatTimestamp(item.startTime)}  </AppText>
            <MaterialIcons name={item.checked ? "check-box" : "check-box-outline-blank"} onPress={() => toggleCheck(item.id)}
              size={24} color="black" />
          </View>
        </View>
        <View style={{ ...FSTYLES, width: '20%' }}>
          <MaterialIcons name="create" size={24} color="black" onPress={() => handleEditItineraryItem(item.id)} />
          <MaterialIcons name="delete" size={24} onPress={() => deleteItineraryItem(item.id)} color="red" />
        </View>
      </View>
    )
  }
  const addItineraryItem = async () => {
    if (ItineraryData.filter(item => item.name === name).length > 0) return ToastAndroid.show("Item already exists", ToastAndroid.SHORT);
    setloading(true);
    try {
      let updatedItems = [];
      if (editItinaryItem !== null) {
        updatedItems = ItineraryData.map(item =>
          item.id === editItinaryItem.id
            ? { name, description, date, startTime, id: editItinaryItem.id }
            : item
        );
      } else {
        updatedItems = [
          ...ItineraryData,
          {
            name,
            description,
            date,
            startTime,
            id: Math.random(),
            checked: false,
            itemName: data.name,
          },
        ];
      }
      await AsyncStorage.setItem('ItineraryData', JSON.stringify(updatedItems));
      setEditItinaryItem(null);
      setItineraryData(updatedItems);
      setName("");
      setDescription("");
      setDate(new Date());
      setStartTime(new Date());
    } catch (error) {
      console.log({ error });
      ToastAndroid.show("Error occurred", ToastAndroid.SHORT);
    } finally {
      setloading(false);
    }
  };
  const getInitialData = async () => {
    setloading(true);
    try {
      const data = JSON.parse(await AsyncStorage.getItem('ItineraryData')) || []
      setItineraryData(data)
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log({ error });
    }
  }
  useEffect(() => {
    getInitialData()
  }, [])
  const deleteItineraryItem = async (id) => {
    try {
      const updatedItems = ItineraryData.filter(item => item.id !== id);
      await AsyncStorage.setItem('ItineraryData', JSON.stringify(updatedItems));
      setItineraryData(updatedItems);
    } catch (error) {
      console.log({ error });
      ToastAndroid.show("Error occurred while deleting item", ToastAndroid.SHORT);
    }
  };
  const toggleCheck = async (id) => {
    try {
      const updatedItems = ItineraryData.map(item => (
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
      await AsyncStorage.setItem('ItineraryData', JSON.stringify(updatedItems));
      setItineraryData(updatedItems);
    } catch (error) {
      console.log({ error });
      ToastAndroid.show("Error occurred while toggling item", ToastAndroid.SHORT);
    }
  };


  const handleEditItineraryItem = (id) => {
    setisCreateDialogVisible(true);
    const findItem = ItineraryData.find(item => item.id === id);
    const { name, description, date, startTime } = findItem;
    setName(name);
    setDescription(description);
    setDate(date);
    setStartTime(startTime);
    setEditItinaryItem(findItem);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showStartTimePicker = () => {
    setIsStartTimePickerVisible(true);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setIsStartTimePickerVisible(false);
    setStartTime(currentDate);
  };
  return (
    <>
      <AppLoader loading={loading} />
      <SafeAreaView className="flex-1 bg-white px-4 py-5 items-center justify-between">
        <View className="w-full mt-5">
          <AppText className="self-start text-[#428288]  text-xl font-bold mt-5">{data.name}</AppText>
          {
            ItineraryData.length === 0 ?
              <View className="items-center justify-center h-[80%]">
                <AppText className="text-center text-xl font-bold mt-5">No Itinerary</AppText>
              </View>
              :
              <ScrollView>
                {
                  ItineraryData?.map((item, index) => (
                    <ItinaryItem key={index} item={item} />
                  ))
                }
              </ScrollView>
          }
        </View>
        <AppButton onPress={() => setisCreateDialogVisible(true)} title={'Add Task'} />
        <Portal>
          <CreateTaskDialog
            showDatepicker={showDatepicker}
            date={date}
            startTime={startTime}
            showStartTimePicker={showStartTimePicker}
            visible={isCreateDialogVisible}
            onPress={addItineraryItem}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            setvisible={setisCreateDialogVisible} />
        </Portal>
      </SafeAreaView>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode={mode}
          display="default"
          minimumDate={new Date()}
          onChange={onChange}
        />
      )}
      {isStartTimePickerVisible && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}

    </>
  )
}

export default CreateItinerary

const styles = StyleSheet.create({})