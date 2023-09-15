import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
const initialState = {
  loader: false,
  user: null,
  userLoggedIn: 'false',
  unloadingData: [],
};

const localReducer = createSlice({
  name: "localReducer",
  initialState,
  reducers: {
    localReducerDataRequested: (localReducer, action) => {
      localReducer.loader = true;
    },
    localReducerDataRequestFailed: (localReducer, action) => {
      localReducer.loader = false;
    },
    getunloadingDataRecieved: (localReducer, action) => {
      localReducer.loader = false;
      localReducer.unloadingData = action.payload;
    },
    setLoginUser: (localReducer, action) => {
      localReducer.user = action.payload;
    },
    checkUserLogin: (userReducer, action) => {
      userReducer.loading = false;
      userReducer.userLoggedIn = action.payload;
    },
  },
});

const {
  localReducerDataRequestFailed,
  localReducerDataRequested,
  getunloadingDataRecieved,
} = localReducer.actions;

export default localReducer.reducer;
export const { setLoginUser, checkUserLogin, } = localReducer.actions
export const getunloadingData = (data) =>
  apiCallBegan({
    method: 'post',
    data,
    onStart: localReducerDataRequested.type,
    onSuccess: getunloadingDataRecieved.type,
    onError: localReducerDataRequestFailed.type,
  });

