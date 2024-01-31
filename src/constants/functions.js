import AsyncStorage from '@react-native-async-storage/async-storage';
import {  setLoginUser } from '../store/localReducer';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { FIRESTORE_COLLECTIONS } from "./routes";
import { db } from "../../firebaseConfig";
export const logoutUser = async (dispatch) => {
    try {
      ToastAndroid.show("Logout successfully", ToastAndroid.SHORT);
      await AsyncStorage.removeItem("loggedInUser");
      dispatch(setLoginUser(null));
    } catch (error) {
      showToast("Logout failed");
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


export const updateUser = async (fdata, dispatch) => {
    try {
      const postRef = doc(db, FIRESTORE_COLLECTIONS.USERS, fdata.id);
      await updateDoc(postRef, fdata).then(async () => {
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(fdata));
        dispatch(setLoginUser(fdata));
      });
    } catch (error) {
      console.log(error);
    }
  };
  export const saveMediaToStorage = async (file, path) => {
    try {
      const storage = getStorage();
      const response = await fetch(file);
      const blob = await response.blob();
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      const url = await new Promise((res, rej) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            showToast("upload Failed");
            rej(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              res(downloadURL);
            });
          }
        );
      });
      return url; // Return the download URL
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error for handling in your app
    }
  };
