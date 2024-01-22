import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkUserLogin } from '../store/localReducer';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

export const logoutUser = async (dispatch) => {
    try {
        dispatch(checkUserLogin('false'))
        await AsyncStorage.removeItem("userLoggedIn")
        await AsyncStorage.removeItem("publicKey")
        // await AsyncStorage.clear()
    } catch (error) {
        console.log(error)
    }
}


export const containsSpecialCharacters = (str) => {
    const regex = /[!₹@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return regex.test(str);
}
export const isValidPhoneNumber = (str) => {
    const regex = /^[6-9][0-9]{9}$/;
    return regex.test(str);
}
export const truncateString = (inputString, maxLength) => {
    if (inputString.length > maxLength) {
        return inputString.substring(0, maxLength) + '...';
    }
    return inputString;
};
export const formatDate = (timestamp) => {
    // Parse the ISO 8601 timestamp string
    const date = new Date(timestamp);
  
    // Extract the day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it is zero-based
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  
    // Return the formatted date in ddmmyy format
    return `${day}/${month}/${year}`;
  }
  
  export const formatTimestamp = (timestamp) => {
    // Parse the ISO 8601 timestamp string
    const date = new Date(timestamp);
  
    // Extract the hours, minutes, and AM/PM indicator
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    // Return the formatted time with AM/PM indicator
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  
export function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

//api calls


export const apiCallsBA = async (Action, Data, Other_Parameter) => {
    try {
        const url = `http://baapi.inland.in/V1/BAAPI.svc/BAAPI`
        const data = {
            Action,
            Data,
            Other_Parameter
        };
        const datas = await axios.post(url, data)
        return datas.data
    } catch (error) {
        console.log(error)
    }
}

